

export const quantityCleaner = (allQuantity:any) => {
    let cleanedQuantity:any = []
    // console.log("why error? ", allQuantity[allQuantity.length-1].Warehouse);

    const generateSize = (quantity:any, firstSize: any) => {

        let allSizes:any = {}
        for(let i = 25; i<47; i++){
            allSizes[String(i)] = (i === firstSize) && quantity ? true : false 
        }
        return allSizes
    }
    
    for(let i of allQuantity){
        for(let g of i.Warehouse){
            const warehouseIndex = cleanedQuantity.findIndex((e:any) => e.warehouse === g.Code)
            if(warehouseIndex >= 0){
                // console.log(cleanedQuantity[warehouseIndex].list);
                
                // const sizeIndex = cleanedQuantity[warehouseIndex].list.findIndex((e:any) => String(e.size) === i.Barcode.substring(9, 11))
                const size = Number(i.Barcode.substring(9, 11))
                
                // console.log(sizeIndex);
                

                if(g.Quantity > 0 ){
                    
                    cleanedQuantity[warehouseIndex].list[size] = true
                }
                // cleanedQuantity[warehouseIndex].list.push({size: i.Barcode.substring(9, 11), isAvailable: g.Quantity > 0 ? true : false})
            }else{
                cleanedQuantity.push({warehouse: g.Code, list: generateSize(g.Quantity > 0, Number(i.Barcode.substring(9, 11)))})
                // const size = Number(i.Barcode.substring(9, 11))

                // if(g.Quantity > 0 ){ 
                //     cleanedQuantity[warehouseIndex].list[size] = true
                // }
            }
        }
    }
    // console.log(cleanedQuantity[0]);
    return cleanedQuantity
    
}