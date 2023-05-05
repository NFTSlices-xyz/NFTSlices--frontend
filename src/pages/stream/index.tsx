import { shorten } from '@did-network/dapp-sdk'
import { Button } from 'uno-ui/src/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from 'uno-ui/src/components/ui/card'
import { useToast } from 'uno-ui/src/components/ui/use-toast'
import { useAccount, useContractRead, useContractWrite, usePrepareContractWrite } from 'wagmi'

import { Header } from '@/components/layout/Header'
import { NetworkSwitcher } from '@/components/SwitchNetworks'
import { WalletModal } from '@/components/WalletModal'
import { useWagmi } from '@/hooks'
import { useCopyToClipboard } from '@/hooks/useCopy'
import { useAtom, useSetAtom } from 'jotai'
import { NFTatom } from '@/store'
import { useProvider } from 'wagmi'
import { useSigner } from 'wagmi'
import AnimatedButton from '@/components/AnimatedButton'
import { Framework } from '@superfluid-finance/sdk-core'
import { Signer } from 'ethers'
import SwapperABI from '../../ABI/SuperNFTSwapper.json'
import WrapperABI from '../../ABI/SuperNFTWrapper.json'
import { parseUnits } from 'ethers/lib/utils.js'

const Home = () => {
  const { address } = useAccount()
  let sf

  const [show, setShow] = useState(false)
  const [selectedNFT] = useAtom(NFTatom)

  const toggleModal = (e: boolean) => {
    setShow(e)
  }

  const provider = useProvider()
  const { data: signer, isError, isLoading } = useSigner()

  // const frameworkInit = async () => {
  // }
  // frameworkInit()

  const approveTokens = async () => {
    sf = await Framework.create({
      chainId: 80001, //i.e. 137 for matic
      provider: provider, // i.e. the provider being used
    })

    const daix = await sf.loadSuperToken('0x96e94C57EB9C7ad8F6ba883065075E55Fcb2CDB6')
    console.log('signer: ', signer)
    let flowOp = daix.updateFlowOperatorPermissions({
      flowOperator: '0xbE05DA04F0E80A34391693c2E7FC3799a721887C',
      permissions: 7,
      flowRateAllowance: '200000000000000000000',
    })

    await flowOp.exec(signer)
  }

  const {
    data: dataFFT,
    // isError,
    // isLoading,
  } = useContractRead({
    address: '0xD92A4831afFAa362a2210Eb42812D348C73dA6BA',
    abi: WrapperABI.abi,
    functionName: 'FFTMappings',
    args: [0],
    watch: true,
  })

  const { config: configStartSwap, refetch: refetchDeposit } = usePrepareContractWrite({
    address: '0xbE05DA04F0E80A34391693c2E7FC3799a721887C',
    abi: SwapperABI.abi,
    functionName: 'StartSwap',
    args: [dataFFT, '1000000000000000', '0x1C9b7d1b145eEae982ecE0B2Ef23cD011B3f4774', parseUnits('500')],
  })

  const {
    data: dataDeposit,
    isLoading: isLoadingDeposit,
    isSuccess: isSuccessDeposit,
    write: writeStartStream,
  } = useContractWrite(configStartSwap)

  const startStream = async () => {
    writeStartStream?.()
  }

  return (
    <>
      <Header
        action={
          <>
            <NetworkSwitcher />
            <WalletModal open={show} onOpenChange={toggleModal} close={() => setShow(false)}>
              {({ isLoading }) => (
                <Button className="flex items-center h-8 mr-4" size="sm">
                  {isLoading && (
                    <span className="i-line-md:loading-twotone-loop inline-flex mr-1 w-4 h-4 text-white"></span>
                  )}{' '}
                  {address ? shorten(address) : 'Connect Wallet'}
                </Button>
              )}
            </WalletModal>
          </>
        }
      />
      <div className="relative max-w-6xl min-h-[calc(100vh-8rem)] m-auto pt-16 flex-col-center justify-start">
        <p
          className="font-bold bg-clip-text text-4xl lt-sm:text-2xl"
          style={
            {
              backgroundImage: 'linear-gradient(270deg, #B4EAA1 0%, #F8D07A 100%)',
              display: 'inline-block',
              lineHeight: 1,
              WebkitTextFillColor: 'transparent',
            } as any
          }
        ></p>

        <div className="mt-0 max-w-6xl m-auto px-4 flex gap-8 flex-wrap justify-center items-center flex-col">
          <div onClick={() => {}} className="w-[250px] bg-white rounded-lg shadow-md overflow-hidden max-w-m mx-auto">
            <img
              className="w-full h-auto"
              src={
                'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNfct6kNIf7oUYjxdGyoAb7JShRb5B1Y_HOQ&usqp=CAU'
              }
              alt=""
            />
            <div className="p-4">
              <p className="text-center">NFT 1</p>
              <h3 className="mb-1">Token ID: </h3>
              <p className="mb-1">Owner: </p>
              <p className="mb-1">Buyer: </p>
              <p>Price: ETH</p>
            </div>
          </div>
          <AnimatedButton onClick={() => approveTokens()} text={'Approve Tokens'}></AnimatedButton>
          <AnimatedButton onClick={() => startStream?.()} text={'Start Stream'}></AnimatedButton>
        </div>
      </div>

      <p>
        {['', '', '', ''].map((_, index) => (
          <Item key={index} />
        ))}
      </p>
    </>
  )
}

export default Home

function Item() {
  const { status } = useWagmi()

  return <span></span>
}
