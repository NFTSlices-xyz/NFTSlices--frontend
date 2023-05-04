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

const Home = () => {
  const { address } = useAccount()

  const [show, setShow] = useState(false)
  const [selectedNFT, setSelectedNFT] = useAtom(NFTatom)

  const toggleModal = (e: boolean) => {
    setShow(e)
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

        <div className="mt-16 max-w-6xl m-auto px-4 flex gap-8 flex-wrap items-stretch justify-center">
          <Card
            onClick={() => {
              setSelectedNFT({ owner: '0x00', buyer: '0x00', price: 20, tokenId: 10 })
              console.log(selectedNFT)
            }}
            className="w-[320px] hover:shadow-#B4EAA1"
          >
            <CardHeader>
              <CardTitle className="flex gap-1">NFT 1</CardTitle>
              <CardDescription>NFT desc</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="flex flex-col gap-4">
                <span>Token ID:</span>
                <span>Owner: </span>
                <span>Buyer:</span>
                <span>Bid Price:</span>
              </div>
            </CardContent>
          </Card>
          <Card className="w-[320px] hover:shadow-#B4EAA1">
            <CardHeader>
              <CardTitle className="flex gap-1">NFT 2</CardTitle>
              <CardDescription>NFT desc</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="flex flex-col gap-4">
                <span>Token ID:</span>
                <span>Owner: </span>
                <span>Buyer:</span>
                <span>Bid Price:</span>
              </div>
            </CardContent>
          </Card>
          <Card className="w-[320px] hover:shadow-#B4EAA1">
            <CardHeader>
              <CardTitle className="flex gap-1">NFT 3</CardTitle>
              <CardDescription>NFT desc</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="flex flex-col gap-4">
                <span>Token ID:</span>
                <span>Owner: </span>
                <span>Buyer:</span>
                <span>Bid Price:</span>
              </div>
            </CardContent>
          </Card>
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
