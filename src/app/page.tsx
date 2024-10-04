"use server"; // This is a client component 👈🏽
import Image from "next/image";
import logo from "@/app/assets/libertoe-logo-A.png";
import testShoe from "@/app/assets/testShoe.jpg";
import { getHesabfaProducts, getHesabfaQuantity } from "@/app/lib/netcall";
// import { useState } from "react";
import HomePage from "@/app/components/mainPage";
import { useSearchParams } from "next/navigation";
import { quantityCleaner } from "./lib/dataCleaner";

const dummyCounts = [
  {
    size: "35",
    isAvailable: false,
  },
  {
    size: "36",
    isAvailable: true,
  },
  {
    size: "37",
    isAvailable: true,
  },
  {
    size: "38",
    isAvailable: false,
  },
  {
    size: "39",
    isAvailable: false,
  },
  {
    size: "40",
    isAvailable: true,
  },
  {
    size: "41",
    isAvailable: false,
  },
  {
    size: "42",
    isAvailable: false,
  },
  {
    size: "43",
    isAvailable: false,
  },
  {
    size: "44",
    isAvailable: true,
  },
  {
    size: "45",
    isAvailable: true,
  },
  {
    size: "46",
    isAvailable: true,
  },
];

const branches = [
  {
    name: "هروی",
    id: "heravi",
    warehouseCode: "11",
  },
  {
    name: "پالادیوم",
    id: "paladium",
    warehouseCode: "12",
  },
  {
    name: "اپال",
    id: "opal",
    warehouseCode: "13",
  },
  {
    name: "آکادا سنتر",
    id: "akada",
    warehouseCode: "14",
  },
];

export default async function Home({ searchParams }: any) {
  // const searchParams = request.nextUrl.searchParams;
  // const query = searchParams.get('query');

  // console.log(searchParams.barcode);

  let data:any = await getHesabfaProducts(searchParams.barcode);
  let codesList = [];
  for (let i of data.data.Result.List) {
    codesList.push(i.Code);
  }
  // console.log("data: ", codesList);

  const allQuantity = await getHesabfaQuantity(codesList);
  // console.log("allQuantity: ", allQuantity.Result);
  // console.log(allQuantity.Result[0].Warehouse);
  // console.log("check error: ", );
  
  const cleanedQuantity = quantityCleaner(allQuantity.Result)

  return (
    <>
      {searchParams.barcode ? (
        <HomePage branches={branches} dummyCounts={dummyCounts} searchParams={searchParams} name={data.data.Result.List[0].Name} cleanedQuantity={cleanedQuantity} />
      ) : (
        <div className="w-full flex flex-col justify-center items-center " >
          <Image
          className=" w-32 aspect-[3/1] object-contain "
          src={logo}
          alt="logo"
        />
        <p className=" font-vazir text-lg mt-10 " >صفحه یافت نشد</p>
        </div>
      )}
    </>
  );
}
