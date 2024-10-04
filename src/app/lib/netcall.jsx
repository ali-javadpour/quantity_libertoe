// import { toast } from "react-toastify"
import axios from "axios";

 const apiUrl = "https://api.libertoe.ir/"
//  const apiUrl = "https://testapi.libertoe.ir/"
// const apiUrl = "http://localhost:8080/";
// const token = localStorage.getItem("token");
export const netCall = (url, method, body) => {

  return new Promise((resolve, reject) => {
    (async () => {
      try {
        // const res = fetch(apiUrl + url, {
        //     method: method,
        //     headers: { "Content-Type": "application/json" },
        //     body: body,
        //   });
        const res = await axios({
          method: method,
          url: apiUrl + url,
          headers: {
            // "Cache-Control": "no-cache",
            // "Content-Type": "application/json",
            "access-token": token,
          },
          data: body,
          //params: JSON.stringify(args)
          //data: bodyPreparer(args)
        });

        const result = res.data;
        resolve({ status: res.status, data: result });
      } catch (err) {
        if (err.response && err.response.status) {
          if (err.response.status === 400) {
            toast.error(String(err.response.data.name), {
              style: { width: "22rem", height: "5rem", fontSize: "1rem" },
            });
            resolve([400, "Bad Request"]);
          } else if (err.response.status === 401) {
            toast.error(String(err.response.data.detail), {
              style: { width: "22rem", height: "5rem", fontSize: "1rem" },
            });
            resolve([401, "unAuthorized", err.response.data.message]);
          } else if (err.response.status === 404) {
            toast.error(String(err.response.data), {
              style: { width: "22rem", height: "5rem", fontSize: "1rem" },
            });
            resolve([404, "not found", err.response.data.message]);
          } else if (err.response.status === 403) {
            toast.error(String(err.response.data), {
              style: { width: "22rem", height: "5rem", fontSize: "1rem" },
            });
            resolve([403, "forbidden"]);
          } else if (err.response.status === 406) {
            resolve([406, "Not Acceptable"]);
          } else if (err.response.status === 415) {
            toast.error(String(err.response.data.name), {
              style: { width: "22rem", height: "5rem", fontSize: "1rem" },
            });
            resolve([415, "Unsupported Media Type"]);
          } else {
            alert(err);
            resolve(["381", "Network error: " + err]);
          }
        } else {
          resolve(["381", "Network error: " + err]);
        }
      }
    })();
  });
};

export const fileUploader = (url, body, onUploadProgress) => {
  console.log("hereeeeee ", url);
  return new Promise((resolve, reject) => {
    (async () => {
      try {
        let formData = new FormData();
        formData.append("file", body);
        //token = `Bearer ${String(token)}`
        console.log("form data : ", formData);
        const res = await axios({
          method: "post",
          url: apiUrl + url,
          headers: {
            // "Cache-Control": "no-cache",
            // "Content-Type": "application/json",
            "access-token": token,
          },
          data: formData,
          onUploadProgress,
        });

        const result = res.data;
        resolve({ status: res.status, data: result });
      } catch (err) {
        console.log(err);
        if (err.response) {
          if (err.response.status === 400) {
            toast.error(String(err.response.data.name), {
              style: { width: "22rem", height: "5rem", fontSize: "1rem" },
            });
            resolve([400, "Bad Request"]);
          } else if (err.response.status === 401) {
            toast.error(String(err.response.data.detail), {
              style: { width: "22rem", height: "5rem", fontSize: "1rem" },
            });
            resolve([401, "unAuthorized"]);
          } else if (err.response.status === 404) {
            toast.error(String(err.response.data.detail), {
              style: { width: "22rem", height: "5rem", fontSize: "1rem" },
            });
            resolve([404, "not found"]);
          } else if (err.response.status === 415) {
            toast.error(String(err.response.data.name), {
              style: { width: "22rem", height: "5rem", fontSize: "1rem" },
            });
            resolve([415, "Unsupported Media Type"]);
          } else {
            resolve(["381", "Network error: " + JSON.stringify(err)]);
          }
        } else {
          resolve(["381", "Network error: " + JSON.stringify(err)]);
        }
      }
    })();
  });
};

export const getProducts = async (page) => {
  const res = await axios({
    method: "get",
    url: `https://libertoe.ir/wp-json/wc/v3/products?per_page=100&page=${page}`,
    headers: {
      // "Cache-Control": "no-cache",
      // "Content-Type": "application/json",
      Authorization:
        "Basic Y2tfMjcyZTA3MTFmMTZhOGM0YTQwNzVlYTkzMTVkMTYyMWI0YWYxMmYwNjpjc184Y2I0ODVkZWViZmJhN2RjY2EwZDNiN2Q4NTcwNTE2YzYwYjI1ODdh",
    },
    // data: body,
    //params: JSON.stringify(args)
    //data: bodyPreparer(args)
  });
  console.log(res);
  return res;
};

export const getHesabfaInvoicesByNote = async (code, startDate, endDate) => {
  const res = await axios({
    method: "post",
    url: "https://api.hesabfa.com/v1/invoice/getinvoices",
    headers: {
      // "Cache-Control": "no-cache",
      // "Content-Type": "application/json",
      // "Authorization": "Basic Y2tfMjcyZTA3MTFmMTZhOGM0YTQwNzVlYTkzMTVkMTYyMWI0YWYxMmYwNjpjc184Y2I0ODVkZWViZmJhN2RjY2EwZDNiN2Q4NTcwNTE2YzYwYjI1ODdh",
    },
    data: {
      apiKey: "E62BNpYDHmn1K8JFNJG24jDSpTE9ktBP",
      userId: "09125436277",
      password: "hadi30386",
      loginToken:
        "3849304732a5e3cfd84a908ffd0b8c1c4e44c804df3692627b127d3f5638d3791105a1df1ddd2f00cb6bf2f36c3d3827",
      // number: 3151,
      type: 0,
      queryInfo: {
        SortBy: "Date",
        SortDesc: true,
        Take: 20,
        Skip: 0,
        Filters: [
          {
            Property: "Note",
            Operator: "*",
            Value: code,
          },
          {
            Property: "Date",
            Operator: ">=",
            Value: startDate,
          },
          {
            Property: "Date",
            Operator: "<=",
            Value: endDate,
          },
        ],
      },
    },
  });
  console.log(res);
  return res;
};
export const getHesabfaProducts = async (number) => {
  try {
    const res = await axios({
      method: "post",
      url: "https://api.hesabfa.com/v1/item/getitems",
      headers: {
        // "Cache-Control": "no-cache",
        // "Content-Type": "application/json",
        // "Authorization": "Basic Y2tfMjcyZTA3MTFmMTZhOGM0YTQwNzVlYTkzMTVkMTYyMWI0YWYxMmYwNjpjc184Y2I0ODVkZWViZmJhN2RjY2EwZDNiN2Q4NTcwNTE2YzYwYjI1ODdh",
      },
      data: {
        
          loginToken: "3849304732a5e3cfd84a908ffd0b8c1c4e44c804df3692627b127d3f5638d3791105a1df1ddd2f00cb6bf2f36c3d3827",
          apiKey: "E62BNpYDHmn1K8JFNJG24jDSpTE9ktBP",
          // "warehouseCode": 11,			
           queryInfo:{
          sortBy: "Barcode",
          sortDesc: true,
          take: 100,
          skip: 0,
          filters:[{
            property: "Barcode",
            operator: "*",
            value: number
            }
          ]
        }
      }
    });
    // console.log(res);
    return res;
  } catch (err) {
    return "something went wrong!";
  }
};
export const getHesabfaQuantity = async (codes) => {
  console.log("codes", codes);
  
  try {
    const res = await axios({
      method: "post",
      url: "https://api.hesabfa.com/v1/item/GetQuantity2",
      headers: {
        // "Cache-Control": "no-cache",
        // "Content-Type": "application/json",
        // "Authorization": "Basic Y2tfMjcyZTA3MTFmMTZhOGM0YTQwNzVlYTkzMTVkMTYyMWI0YWYxMmYwNjpjc184Y2I0ODVkZWViZmJhN2RjY2EwZDNiN2Q4NTcwNTE2YzYwYjI1ODdh",
      },
      data: {
        
          loginToken: "3849304732a5e3cfd84a908ffd0b8c1c4e44c804df3692627b127d3f5638d3791105a1df1ddd2f00cb6bf2f36c3d3827",
          apiKey: "E62BNpYDHmn1K8JFNJG24jDSpTE9ktBP",
          // "warehouseCode": 11,			
          "codes": codes
      }
    });
    // console.log(res);
    return res.data;
  } catch (err) {
    return "something went wrong!";
  }
};
