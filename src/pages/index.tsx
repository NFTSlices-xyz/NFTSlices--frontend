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
import sliceNFTABI from '../ABI/SliceNFT.json'
import NFTABI from '../ABI/SliceNFT.json'
import { ethers } from 'ethers'

const Home = () => {
  let sales: any = []
  const [nfts, setNfts] = useState()
  const { data: signer, isError, isLoading } = useSigner()
  const salesContractAddress = '0xF4F1Ff07d162385caE638DB528A6B6C35C3d700D'

  const {
    data: dataSales,
    // isError,
    // isLoading,
  } = useContractRead({
    address: salesContractAddress,
    abi: NFTABI.abi,
    functionName: 'symbol',
    watch: true,
  })

  console.log('data: ', dataSales)
  return (
    <>
      <Header
        action={
          <>
            <NetworkSwitcher />
            {/* <WalletModal open={show} onOpenChange={toggleModal} close={() => setShow(false)}>
              {({ isLoading }) => (
                <Button className="flex items-center h-8 mr-4" size="sm">
                  {isLoading && (
                    <span className="i-line-md:loading-twotone-loop inline-flex mr-1 w-4 h-4 text-white"></span>
                  )}{' '}
                  {address ? shorten(address) : 'Connect Wallet'}
                </Button>
              )}
            </WalletModal> */}
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
            // onClick={() => {
            //   setSelectedNFT({ owner: '0x00', buyer: '0x00', price: 20, tokenId: 10 })
            //   console.log(selectedNFT)
            //   navigate('wrap')
            // }}
            className="w-[300px] bg-white rounded-lg shadow-md overflow-hidden max-w-m mx-auto"
          >
            <img className="w-full h-auto" src={nft2} alt="" />
            <div className="p-4">
              <p className="text-center">NFT 1</p>
              <h3 className="mb-1">Token ID: 0</h3>
              <p className="mb-1">Owner: </p>
              <p className="mb-1">Buyer: </p>
              <p>Price: ETH</p>
            </div>
          </div>
          <div
            // onClick={() => {
            //   setSelectedNFT({ owner: '0x00', buyer: '0x00', price: 20, tokenId: 10 })
            //   console.log(selectedNFT)
            // }}
            className="w-[300px] bg-white rounded-lg shadow-md overflow-hidden max-w-m mx-auto"
          >
            <img className="w-full h-auto" src={nft3} alt="" />
            <div className="p-4">
              <p className="text-center">NFT 2</p>
              <h3 className="mb-1">Token ID: 1</h3>
              <p className="mb-1">Owner: </p>
              <p className="mb-1">Buyer: </p>
              <p>Price: ETH</p>
            </div>
          </div>
          <div
            // onClick={() => {
            //   setSelectedNFT({ owner: '0x00', buyer: '0x00', price: 20, tokenId: 10 })
            //   console.log(selectedNFT)
            // }}
            className="w-[300px] bg-white rounded-lg shadow-md overflow-hidden max-w-m mx-auto"
          >
            <img className="w-full h-auto" src={nft1} alt="" />
            <div className="p-4">
              <p className="text-center">NFT 3</p>
              <h3 className="mb-1">Token ID: 2</h3>
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
