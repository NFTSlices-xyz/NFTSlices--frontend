import { shorten } from '@did-network/dapp-sdk'
import { Button } from 'uno-ui/src/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from 'uno-ui/src/components/ui/card'
import { useToast } from 'uno-ui/src/components/ui/use-toast'
import { useAccount, useContract, useContractRead, useContractReads, useSigner } from 'wagmi'
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

import salesABI from '../ABI/NFTMarketplace.json'
import { ethers } from 'ethers'

const Home = () => {
  const { address } = useAccount()
  const navigate = useNavigate()
  const [show, setShow] = useState(false)
  let sales: any = []
  const [nfts, setNfts] = useState<any[]>()
  const { data: signer, isError, isLoading } = useSigner()
  const salesContractAddress = '0x5A48adf86B30119b54f8e7d6e4e5dEB6C15c1437'
  const salesContract = useContract({ address: salesContractAddress, abi: salesABI.abi, signerOrProvider: signer })
  const [selectedNFT, setSelectedNFT] = useAtom(NFTatom)
  const toggleModal = (e: boolean) => {
    setShow(e)
  }
  const fetchNFTs = async () => {
    console.log('triggered')
    for (let index = 0; index < 3; index++) {
      sales.push(await salesContract!.sales(index))
    }
    setNfts(sales)
  }
  useEffect(() => {
    if (!signer) return
    fetchNFTs()
  }, [isLoading])
  function truncateString(str: string) {
    if (str.length > 10) {
      return str.slice(0, 10) + '...'
    } else {
      return str
    }
  }
  const images = [
    'https://bafkreidx4g6tyevq5x6vxwvsqh33w2cf7mluvkxeh53troghhufqc2ww7m.ipfs.nftstorage.link/',
    'https://bafkreigobjk7amnhw6phae62oxa6ltx4vnegziefje2i6kckbp3ksgnudy.ipfs.nftstorage.link/',
    'https://bafkreibrklajjboc3uijgcuj4usjokpskt7aq5b33ieeujs37h42vjhxx4.ipfs.nftstorage.link/',
  ]
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
          {nfts &&
            nfts.map((nftItem, index) => {
              return (
                <div
                  onClick={() => {
                    setSelectedNFT({
                      owner: nftItem[1],
                      buyer: nftItem[0],
                      price: ethers.utils.formatEther(nftItem[2]),
                      tokenId: nftItem[3],
                    })
                    console.log(selectedNFT)
                    if (selectedNFT) {
                      navigate('wrap')
                    }
                  }}
                  className="w-[300px] bg-white rounded-lg shadow-md overflow-hidden max-w-m mx-auto"
                >
                  <img className="w-full h-auto" src={images[index]} alt="" />
                  <div className="p-4">
                    <p className="text-center">{`NFT ${nftItem[3]}`}</p>
                    <h3 className="mb-1">{`Token ID: ${nftItem[3]}`}</h3>
                    <p className="mb-1">{`Owner: ${truncateString(nftItem[1])}`} </p>
                    <p className="mb-1">{`Buyer: ${truncateString(nftItem[0])}`} </p>
                    <p>{`Price: ${ethers.utils.formatEther(nftItem[2])}`} USDC</p>
                  </div>
                </div>
              )
            })}
        </div>
      </div>

      <p></p>
    </>
  )
}

export default Home
