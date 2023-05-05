import { shorten } from '@did-network/dapp-sdk'
import { Button } from 'uno-ui/src/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from 'uno-ui/src/components/ui/card'
import { useToast } from 'uno-ui/src/components/ui/use-toast'
import { useAccount } from 'wagmi'

import { Header } from '@/components/layout/Header'
import { NetworkSwitcher } from '@/components/SwitchNetworks'
import { WalletModal } from '@/components/WalletModal'
import { useWagmi } from '@/hooks'
import { useCopyToClipboard } from '@/hooks/useCopy'
import { useAtom, useSetAtom } from 'jotai'
import { NFTatom } from '@/store'
import AnimatedButton from '@/components/AnimatedButton'

const Home = () => {
  const { address } = useAccount()

  const [show, setShow] = useState(false)
  const [selectedNFT] = useAtom(NFTatom)

  const toggleModal = (e: boolean) => {
    setShow(e)
  }
  function truncateString(str: string) {
    if (str.length > 10) {
      return str.slice(0, 10) + '...'
    } else {
      return str
    }
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

        <div className="mt-0 max-w-6xl m-auto px-4 flex gap-8 flex-wrap justify-center items-center flex-col">
          <div onClick={() => {}} className="w-[250px] bg-white rounded-lg shadow-md overflow-hidden max-w-m mx-auto">
            <img
              className="w-full h-auto"
              src={'https://bafkreidx4g6tyevq5x6vxwvsqh33w2cf7mluvkxeh53troghhufqc2ww7m.ipfs.nftstorage.link/'}
              alt=""
            />
            <div className="p-4">
              <p className="text-center">{`NFT 0`}</p>
              <h3 className="mb-1">{`Token ID: 1`}</h3>
              <p className="mb-1">{`Owner: 0x332dE499...`} </p>
              <p className="mb-1">{`Buyer: 0x0c49FFE6...`} </p>
              <p>{`Price: 500.0`} USDC</p>
            </div>
          </div>
          <AnimatedButton text={'Start Stream'}></AnimatedButton>
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
