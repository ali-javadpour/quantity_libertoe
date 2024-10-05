"use client"; // This is a client component 👈🏽
import Image from "next/image";
import logo from "@/app/assets/libertoe-logo-A.png";
import testShoe from "@/app/assets/testShoe.jpg";
import { useEffect, useState } from "react";
import {toFarsiNumber} from "@/app/lib/initialProps"

const HomePage = ({branches, dummyCounts, searchParams, name, cleanedQuantity}:any) => {

    const [selectedBranch, setSelectedBranch] = useState("")
    const [showingCounts, setShowingCounts] = useState([])
    const [availableInSelectedBranch, setAvailableInSelectedBranch] = useState(true)

    useEffect(()=>{
      console.log(cleanedQuantity);
      
      const branchListCode = branches.map((item:any) => item.warehouseCode)
      if(branchListCode.includes(searchParams.branch)){
          setSelectedBranch(searchParams.branch)
        }else{
          setSelectedBranch("11")
        }
        
    },[])

    useEffect(()=>{
        console.log("selectedBranch: ",selectedBranch);
        console.log("cleanedQuantity: ",cleanedQuantity);
        
        const list = cleanedQuantity.find((e:any) => String(e.warehouse) === selectedBranch )
        console.log(list);
        
        if(list){
          setAvailableInSelectedBranch(true)
            setShowingCounts(list.list)
        }else{
          setAvailableInSelectedBranch(false)
        }
        
    },[selectedBranch])

  return (
    <div className=" font-vazir w-full flex justify-center ">
      <div className=" w-[500px] flex flex-col items-center gap-6 pt-3 ">
        <Image
          className=" w-32 aspect-[3/1] object-contain "
          src={logo}
          alt="logo"
        />
        <img
          className=" w-4/5 max-w-[400px] aspect-[4/3] object-cover rounded-2xl shadow-lg "
          width={400}
          height={300}
          src={searchParams.image}
          alt="logo"
        />
        <p className=" text-2xl text-[#e0a435] ">{name}</p>
        <div className=" w-full flex flex-row items-center justify-center ">
          <div className=" flex flex-row items-center justify-center border rounded-full overflow-hidden ">
            {branches.map((item:any, index:number) => {
              return (
                <p
                key={item.id}
                  className={` py-2 px-4 cursor-pointer ease-in-out duration-300 ${
                    index < branches.length - 1 ? "border-r " : ""
                  } ${
                    selectedBranch === item.warehouseCode && "bg-[#016f67] text-white "
                  } `}
                  onClick={() => setSelectedBranch(item.warehouseCode)}
                >
                  {item.name}
                </p>
              );
            })}
          </div>
        </div>
        <div className=" w-11/12 px-5 py-3 border rounded-xl  ">
        {availableInSelectedBranch ? 
          <table className="table-auto w-full border-spacing-6 ">
            <thead className=" border-b ">
              <tr>
                <th>موجودی</th>
                <th>سایز</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(showingCounts).map((item:any, index:number) => {
                return (
                  <tr
                    key={item}
                    className={`text-center h-12 ${
                      index < Object.keys(showingCounts).length - 1 && "border-b border-dashed"
                    } `}
                  >
                    {showingCounts[item] ? (
                      <td className=" text-green-600 ">موجود</td>
                    ) : (
                      <td className=" text-red-600 ">ناموجود</td>
                    )}
                    <td>{toFarsiNumber(item)}</td>
                  </tr>
                );
              })}
              {/* <tr className=" text-center h-12 " >
                <td className=" text-red-600 " >ناموجود</td>
                <td>۴۲</td>
              </tr>
              <tr className=" text-center h-12 " >
                <td className=" text-green-600 " >موجود</td>
                <td>۴۳</td>
              </tr> */}
            </tbody>
          </table>
        :
        <p className=" text-center " >این مدل در این شعبه موجود نمی باشد</p>  
        }
        </div>
      </div>
    </div>
  );
};

export default HomePage
