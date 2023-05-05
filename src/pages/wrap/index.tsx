import { shorten } from '@did-network/dapp-sdk'
import { Button } from 'uno-ui/src/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from 'uno-ui/src/components/ui/card'
import { useToast } from 'uno-ui/src/components/ui/use-toast'
import { useAccount, useContract, useProvider, useSigner } from 'wagmi'
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
const Home = () => {
  let sf
  function truncateString(str: string) {
    if (str.length > 10) {
      return str.slice(0, 10) + '...'
    } else {
      return str
    }
  }
  const { data: signer, isError, isLoading } = useSigner()
  const provider = useProvider()
  const wrapperContractAddress = '0xD92A4831afFAa362a2210Eb42812D348C73dA6BA'
  const wrapperContract = useContract({
    address: wrapperContractAddress,
    abi: wrapperABI.abi,
    signerOrProvider: signer,
  })
  const { address } = useAccount()

  const [show, setShow] = useState(false)
  const [selectedNFT] = useAtom(NFTatom)

  const toggleModal = (e: boolean) => {
    setShow(e)
  }
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
            <div className="w-[300px] bg-white rounded-lg shadow-md overflow-hidden max-w-m mx-auto">
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

          <AnimatedButton text={'Wrap'}></AnimatedButton>
          <AnimatedButton text={'Approve'}></AnimatedButton>

          <div onClick={() => {}} className="w-[300px] bg-white rounded-lg shadow-md overflow-hidden max-w-m mx-auto">
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
