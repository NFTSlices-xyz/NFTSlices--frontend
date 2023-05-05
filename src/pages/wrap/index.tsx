import { shorten } from '@did-network/dapp-sdk'
import { Button } from 'uno-ui/src/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from 'uno-ui/src/components/ui/card'
import { useToast } from 'uno-ui/src/components/ui/use-toast'
import {
  useAccount,
  useContract,
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
  useProvider,
  useSigner,
} from 'wagmi'
import { Framework } from '@superfluid-finance/sdk-core'
import { Header } from '@/components/layout/Header'
import { NetworkSwitcher } from '@/components/SwitchNetworks'
import { WalletModal } from '@/components/WalletModal'
import { useWagmi } from '@/hooks'
import { useCopyToClipboard } from '@/hooks/useCopy'
import { useAtom, useSetAtom } from 'jotai'
import { NFTatom } from '@/store'
import AnimatedButton from '@/components/AnimatedButton'
import { Signer, ethers } from 'ethers'
import wrapperABI from '../../ABI/SuperNFTWrapper.json'
import nftABI from '../../ABI/SliceNFT.json'
import { NFTCONTRACT, NFTWRAPPER, SUPERNFTSWAPPER, USDCTOKEN } from '@/constants'
const Home = () => {
  let sf
  function truncateString(str: string) {
    if (str.length > 10) {
      return str.slice(0, 10) + '...'
    } else {
      return str
    }
  }
  const [shades, setShade] = useState<boolean>(true)
  const { data: signer, isError, isLoading } = useSigner()
  const provider = useProvider()
  const wrapperContractAddress = NFTWRAPPER
  const wrapperContract = useContract({
    address: wrapperContractAddress,
    abi: wrapperABI.abi,
    signerOrProvider: signer,
  })
  const { address } = useAccount()

  const [show, setShow] = useState(true)
  const [selectedNFT] = useAtom(NFTatom)

  const toggleModal = (e: boolean) => {
    setShow(e)
  }

  const {
    data: dataFFT,
    // isError,
    // isLoading,
  } = useContractRead({
    address: NFTWRAPPER,
    abi: wrapperABI.abi,
    functionName: 'FFTMappings',
    args: [0],
    watch: true,
  })

  //@ts-ignore
  const approveTokens = async (dataFFT) => {
    console.log('tokkens being approved: ', dataFFT)
    sf = await Framework.create({
      chainId: 80001, //i.e. 137 for matic
      provider: provider, // i.e. the provider being used
    })

    console.log('supertkn: ', dataFFT)
    const daix = await sf.loadSuperToken(dataFFT)
    console.log('signer: ', signer)
    let flowOp = daix.updateFlowOperatorPermissions({
      flowOperator: SUPERNFTSWAPPER,
      permissions: 7,
      flowRateAllowance: '200000000000000000000',
    })
    // @ts-ignore
    await flowOp.exec(signer)
    setShade(shades!)
  }

  const { config: configWrap } = usePrepareContractWrite({
    address: NFTWRAPPER,
    abi: wrapperABI.abi,
    functionName: 'wrapNFT',
    args: [0, 'https://bafkreidx4g6tyevq5x6vxwvsqh33w2cf7mluvkxeh53troghhufqc2ww7m.ipfs.nftstorage.link/'],
  })

  const {
    data: dataWrap,
    isLoading: isLoadingDeposit,
    isSuccess: isSuccessDeposit,
    write: writeWrap,
  } = useContractWrite(configWrap)

  const { config: configApprove } = usePrepareContractWrite({
    address: NFTCONTRACT,
    abi: nftABI.abi,
    functionName: 'approve',
    args: [NFTWRAPPER, 0],
  })

  const { write: writeApprove } = useContractWrite(configApprove)

  const [_, copy] = useCopyToClipboard()
  const { toast } = useToast()

  const copyHandler = useCallback(() => {
    copy('pnpm dlx fisand')

    toast({
      title: 'Copied success!',
    })
  }, [copy, toast])

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

        <div className="mt-5 max-w-6xl m-auto px-4 flex gap-8 flex-wrap justify-center items-center">
          {selectedNFT && (
            <div
              className={`${
                !shades ? 'bg-gray-500 opacity-50' : ''
              } w-[300px]  rounded-lg shadow-md overflow-hidden max-w-m mx-auto`}
            >
              <img
                className="w-full h-auto"
                src={'https://bafkreidx4g6tyevq5x6vxwvsqh33w2cf7mluvkxeh53troghhufqc2ww7m.ipfs.nftstorage.link/'}
                alt=""
              />

              <div className="p-4">
                <p className="text-center">{`NFT ${selectedNFT.tokenId + 1}`}</p>
                <h3 className="mb-1">{`Token ID: ${selectedNFT.tokenId}`}</h3>
                <p className="mb-1">{`Owner: ${truncateString(selectedNFT.owner)}`} </p>
                <p className="mb-1">{`Buyer: ${truncateString(selectedNFT.buyer)}`} </p>
                <p>{`Price: ${selectedNFT.price}`} USDC</p>
              </div>
            </div>
          )}

          <div className="flex flex-col gap-8">
            <AnimatedButton onClick={() => writeApprove?.()} text={'Approve NFT'}></AnimatedButton>
            <AnimatedButton onClick={() => writeWrap?.()} text={'Wrap'}></AnimatedButton>
            <AnimatedButton onClick={() => approveTokens?.(dataFFT)} text={'Approve Stream'}></AnimatedButton>
          </div>

          <div
            className={`${
              shades ? 'bg-gray-500 opacity-50' : ''
            } w-[300px]  rounded-lg shadow-md overflow-hidden max-w-m mx-auto`}
          >
            <img
              className="w-full h-auto"
              src={'https://bafkreidx4g6tyevq5x6vxwvsqh33w2cf7mluvkxeh53troghhufqc2ww7m.ipfs.nftstorage.link/'}
              alt=""
            />

            <div className="p-4">
              <p className="text-center">{`Super NFT ${selectedNFT.tokenId + 1}`}</p>
              <h3 className="mb-1">{`Token ID: ${selectedNFT.tokenId}`}</h3>
              <p className="mb-1">{`Owner: ${truncateString(selectedNFT.owner)}`} </p>
              <p className="mb-1">{`Buyer: ${truncateString(selectedNFT.buyer)}`} </p>
              <p>{`Price: ${selectedNFT.price}`} USDC</p>
            </div>
          </div>
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
