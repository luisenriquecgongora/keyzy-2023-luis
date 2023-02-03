import { Outfit } from '@next/font/google'
import { useState } from 'react';
import CustomSlider from './components/CustomSlider';
import { useQuery } from "react-query";

const outfit = Outfit({ subsets: ['latin'], weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'], variable: '--font-outfit' })

const getID = (URL: string) => {
  if (URL[URL.length - 1] === '#' && URL.startsWith("https://www.rightmove.co.uk/properties/")) {
    const idExtended = URL.replace("https://www.rightmove.co.uk/properties/", "");
    const id = idExtended.slice(0, -1);
    if (/^\d+$/.test(id)) {
      return id;
    }
  }
  return null;
}

const LISTING_PRICE = 350000;
const POST_CODE = "CR6 9RR";
const minDesiredYield = 4.5;
const maxDesiredYield = 9;
export default function Home() {
  const [URL, setURL] = useState("");
  const [discountVsAsking, setDiscountVsAsking] = useState(15);
  const [desiredYield, setDesiredYield] = useState("6");
  const [convertedRentRate, setConvertedRentRate] = useState(20);
  const [duration, setDuration] = useState(5);

  const validDesiredYield = parseFloat(desiredYield) >= minDesiredYield && parseFloat(desiredYield) <= maxDesiredYield;
  const id = getID(URL);
  const target_price = LISTING_PRICE * (1 - discountVsAsking / 100);
  const rent = (target_price / 12) * parseFloat(desiredYield) / 100;
  const converted_rent = (target_price / 12) * (parseFloat(desiredYield) / 100) * (convertedRentRate / 100);
  const total_monthly_rent = rent + converted_rent;
  const future_buy_back_price = target_price - (converted_rent * duration * 12)
  return (
    <div className={`${outfit.variable} font-sans flex flex-col`}>
    <div className='text-red-500 w-full shrink-0 flex items-center justify-center mt-10 hidden md:flex lg:hidden'>Not tablet friendly - please use mobile or desktop device.</div>
    <div className={`${outfit.variable} font-sans flex flex-col md:flex-row items-start justify-center max-w-full pt-10`}>
      <div className='flex flex-col items-start justify-start p-5 w-full max-w-sm'>
        <div className='font-bold'>Input</div>
        <div className='h-14 w-full flex flex-row items-center justify-between mt-3'>
          <div>URL</div>
          <input className='h-8 w-60 border-navy border-2 border-solid border rounded-sm px-2' placeholder='Enter URL' onChange={(e) => setURL(e.target.value)} value={URL} />
        </div>
        <div className='h-14 w-full flex flex-row items-center justify-between mt-3'>
          <div>Discount vs. Asking Price</div>
          <div className='w-60 shrink-0	'>
            <CustomSlider step={1} min={0} max={30} value={discountVsAsking} setValue={setDiscountVsAsking} />
          </div>
        </div>
        <div className='h-14 w-full flex flex-row items-center justify-between mt-3'>
          <div>Desired Yield (%)</div>
          <input className={`${(validDesiredYield) ? '' : 'text-red-500'} h-8 w-60 border-navy border-2 border-solid border rounded-sm px-2`} placeholder='Enter Desired Yield' onChange={(e) => setDesiredYield(e.target.value)} value={desiredYield} type="number" min="4.5" max="9" maxLength={2} />
        </div>
        <div className='h-14 w-full flex flex-row items-center justify-between mt-3'>
          <div>Converted Rate</div>
          <div className='w-60 shrink-0	'>
            <CustomSlider step={5} min={10} max={25} value={convertedRentRate} setValue={setConvertedRentRate} />
          </div>
        </div>
        <div className='h-14 w-full flex flex-row items-center justify-between mt-3'>
          <div>Duration (years)</div>
          <div className='w-60 flex'>
            <button className={`${duration === 3 ? 'bg-azure' : 'bg-navy'} py-2 px-3 mr-3 w-20 text-white`} onClick={() => setDuration(3)}>3</button>
            <button className={`${duration === 5 ? 'bg-azure' : 'bg-navy'} py-2 px-3 mr-3 w-20 text-white`} onClick={() => setDuration(5)}>5</button>
            <button className={`${duration === 7 ? 'bg-azure' : 'bg-navy'} py-2 px-3 mr-3 w-20 text-white`} onClick={() => setDuration(7)}>7</button>
          </div>
        </div>
      </div>
      <div className='flex flex-col items-start justify-start p-5 w-full max-w-sm'>
        {!validDesiredYield && <div className='font-bold text-red-500 my-4 border-2 border-solid border rounded-sm border-red-500 px-4'>Invalid Desired Yield. Min is 4.5 and max is 9!</div>}
        <div className='font-bold'>Data Retrieved</div>
        <div className='h-14 w-full flex flex-row items-center justify-between mt-3'>
          <div>Listing Price</div>
          <div>£ {id && validDesiredYield && LISTING_PRICE.toLocaleString("en-US")}</div>
        </div>
        <div className='h-14 w-full flex flex-row items-center justify-between mt-3'>
          <div>Post Code</div>
          <div>{id && validDesiredYield && POST_CODE}</div>
        </div>
        <div className='font-bold'>Calculations Retrieved</div>
        <div className='h-14 w-full flex flex-row items-center justify-between mt-3'>
          <div>Target Price</div>
          <div>£ {id && validDesiredYield && target_price.toLocaleString("en-US")}</div>
        </div>
        <div className='h-14 w-full flex flex-row items-center justify-between mt-3'>
          <div>Total Monthly Rental</div>
          <div>£ {id && validDesiredYield && total_monthly_rent.toLocaleString("en-US")}</div>
        </div>
        <div className='h-14 w-full flex flex-row items-center justify-between mt-3'>
          <div className='ml-10'>Rent</div>
          <div>£ {id && validDesiredYield && rent.toLocaleString("en-US")}</div>
        </div>
        <div className='h-14 w-full flex flex-row items-center justify-between mt-3'>
          <div className='ml-10'>Converted</div>
          <div>£ {id && validDesiredYield && converted_rent.toLocaleString("en-US")}</div>
        </div>
        <div className='h-14 w-full flex flex-row items-center justify-between mt-3'>
          <div>Future buy-back price</div>
          <div>£ {id && validDesiredYield && future_buy_back_price.toLocaleString("en-US")}</div>
        </div>
      </div>
    </div>
    </div>
  )
}
