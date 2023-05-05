import { shorten } from '@did-network/dapp-sdk'
import { Button } from 'uno-ui/src/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from 'uno-ui/src/components/ui/card'
import { useToast } from 'uno-ui/src/components/ui/use-toast'
import { useAccount, useContract, useContractRead, useContractReads } from 'wagmi'
import WagmiABI from '../hooks/abi/Wagmi.json'
import { Header } from '@/components/layout/Header'
import { NetworkSwitcher } from '@/components/SwitchNetworks'
import { WalletModal } from '@/components/WalletModal'
import { useCopyToClipboard } from '@/hooks/useCopy'
import { useAtom, useSetAtom } from 'jotai'
import { NFTatom } from '@/store'
import { useNavigate } from 'react-router'
import nft1 from '@/assets/1.png'
import nft2 from '@/assets/2.png'
import nft3 from '@/assets/3.png'

const Home = () => {
  const { address } = useAccount()
  const navigate = useNavigate()
  const [show, setShow] = useState(false)
  const [selectedNFT, setSelectedNFT] = useAtom(NFTatom)

  const toggleModal = (e: boolean) => {
    setShow(e)
  }

  const [_, copy] = useCopyToClipboard()
  const { toast } = useToast()
  Item()
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

        <div className="mt-5 max-w-6xl m-auto px-4 flex gap-8 flex-wrap items-stretch justify-center">
          <div
            onClick={() => {
              setSelectedNFT({ owner: '0x00', buyer: '0x00', price: 20, tokenId: 10 })
              console.log(selectedNFT)
              navigate('wrap')
            }}
            className="w-[300px] bg-white rounded-lg shadow-md overflow-hidden max-w-m mx-auto"
          >
            <img className="w-full h-auto" src={nft2} alt="" />
            <div className="p-4">
              <p className="text-center">NFT 1</p>
              <h3 className="mb-1">Token ID: </h3>
              <p className="mb-1">Owner: </p>
              <p className="mb-1">Buyer: </p>
              <p>Price: ETH</p>
            </div>
          </div>
          <div
            onClick={() => {
              setSelectedNFT({ owner: '0x00', buyer: '0x00', price: 20, tokenId: 10 })
              console.log(selectedNFT)
            }}
            className="w-[300px] bg-white rounded-lg shadow-md overflow-hidden max-w-m mx-auto"
          >
            <img className="w-full h-auto" src={nft3} alt="" />
            <div className="p-4">
              <p className="text-center">NFT 2</p>
              <h3 className="mb-1">Token ID: </h3>
              <p className="mb-1">Owner: </p>
              <p className="mb-1">Buyer: </p>
              <p>Price: ETH</p>
            </div>
          </div>
          <div
            onClick={() => {
              setSelectedNFT({ owner: '0x00', buyer: '0x00', price: 20, tokenId: 10 })
              console.log(selectedNFT)
            }}
            className="w-[300px] bg-white rounded-lg shadow-md overflow-hidden max-w-m mx-auto"
          >
            <img className="w-full h-auto" src={nft1} alt="" />
            <div className="p-4">
              <p className="text-center">NFT 3</p>
              <h3 className="mb-1">Token ID: </h3>
              <p className="mb-1">Owner: </p>
              <p className="mb-1">Buyer: </p>
              <p>Price: ETH</p>
            </div>
          </div>
        </div>
      </div>

      <p></p>
    </>
  )
}

export default Home

async function Item() {
  const contract = useContract({
    address: '0xecb504d39723b0be0e3a9aa33d646642d1051ee1',
    abi: WagmiABI,
  })

  console.log(contract)
}
