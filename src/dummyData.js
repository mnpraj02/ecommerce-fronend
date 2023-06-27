const userRows = [
  {
    id: 1,
    Name: "Ravindra",
    avatar:
    "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
    phoneNo: "123456",
    address: "Ananthauram",
    locationName: "ABC Street",
  },
  {
    id: 2,
    Name: "Chetan",
    avatar:
    "https://rukminim1.flixcart.com/image/416/416/ktketu80/mobile/3/e/o/iphone-13-pro-max-mll63hn-a-apple-original-imag6vpgwfgxdsj6.jpeg?q=70",
    phoneNo: "34681999929",
    address: "Hyderabad",
    locationName: "Jublee Hills",
  },
  {
    id: 3,
    Name: "Bhargav",
    avatar:
    "https://assets.myntassets.com/f_webp,dpr_1.0,q_60,w_210,c_limit,fl_progressive/assets/images/1353004/2018/9/18/a8acac3a-077a-400f-a1c7-519215a5265e1537251707732-Roadster-Men-Blue-Denim-Washed-Casual-Shirt-5281537251705552-1.jpg",
    phoneNo: "34681568929",
    address: "Vizag",
    locationName: "oppsite Jagadhamba Theatre",
  },
  {
    id: 4,
    Name: "Sravan",
    avatar:
    "https://assets.myntassets.com/f_webp,dpr_1.0,q_60,w_210,c_limit,fl_progressive/assets/images/15248534/2021/10/20/d658aaa9-dd2e-424c-98a6-8df71abaf0be1634729694763-Nautica-Men-Jeans-4551634729693996-5.jpg",
    phoneNo: "972552992025",
    address: "Guntur",
    locationName: "Children's Park",
  },
  {
    id: 5,
    Name: "Rithwik",
    avatar:
    "https://assets.myntassets.com/f_webp,dpr_1.0,q_60,w_210,c_limit,fl_progressive/assets/images/12247308/2021/6/4/f210363f-8c55-42bc-a6f0-238077c18bc41622789741703-UNDER-ARMOUR-Men-Sports-Shoes-8471622789741281-5.jpg",
    phoneNo: "972552992024",
    address: "Nellore",
    locationName: "Ramji Nagar",
  },
  {
    id: 6,
    Name: "Chandler Bing",
    avatar:
    "https://assets.myntassets.com/f_webp,dpr_1.0,q_60,w_210,c_limit,fl_progressive/assets/images/productimage/2019/12/27/3c5bc598-2093-48df-8e7c-6329adf0c2661577401172457-1.jpg",
    phoneNo: "48727801893",
    address: "Ls Angeles",
    locationName: "Centrel Perk",
  },
  {
    id: 7,
    Name: "Joey Tribbianni",
    avatar:
    "https://assets.myntassets.com/f_webp,dpr_1.0,q_60,w_210,c_limit,fl_progressive/assets/images/9803279/2019/10/11/08d246d9-80d1-4c61-8826-2074624aa0521570782280949-Apple-White-2nd-Gen-AirPods-with-Charging-Case-MV7N2HNA-1181-4.jpg",
    phoneNo: "79262154972",
    address: "California",
    locationName: "Dollars Street",
  },
  {
    id: 8,
    Name: "Ross Geller",
    avatar:
    "https://assets.myntassets.com/f_webp,dpr_1.0,q_60,w_210,c_limit,fl_progressive/assets/images/6518755/2021/2/10/7249229f-5eb1-43dd-9c31-547d43f799c41612945435520-Philips-Men-Corded--Cordless-Rechargeable-Beard-Trimmer-BT32-1.jpg",
    phoneNo: "79262149162",
    address: "Boston",
    locationName: "Fci Colony",
  },
  {
    id: 9,
    Name: "Thomas Shelby",
    avatar:
    "https://rukminim1.flixcart.com/image/312/312/kuvkcy80/computer/x/s/4/na-gaming-laptop-acer-original-imag7whp2f8fgpaz.jpeg?q=70",
    phoneNo: "16465106465",
    address: "Birmingham",
    locationName: "Shelby's Bar",
  },
  {
    id: 10,
    Name: "Walter White",
    avatar:
      "https://thumbs.dreamstime.com/z/fashion-model-woman-golden-bright-sparkles-girl-golden-skin-hair-portrait-closeup-fashion-model-woman-golden-bright-113010779.jpg",
    phoneNo: "447944649472",
    address: "Albequerky",
    locationName: "Los Pollos",
  },
];

const cards = [
  {
    id: 1,
    avatar:
      "https://bfsi.eletsonline.com/wp-content/uploads/2020/09/Bajaj-Finserv-inks-Kwik.ID-as-their-Exclusive-Video-KYC-Partner.jpg",
    type: "Bajaj Finance",
    cardNo: "12345***9",
    name: "Ravindra",
    expiry: "10/2022",
  },
  {
    id: 2,
    avatar:
      "https://banksifsccode.com/blog/media/2020-03/how-to-login-to-union-bank-s-net-banking-account-step-4.jpg",
    type: "Union Bank",
    cardNo: "62545***1",
    name: "Chetan",
    expiry: "9/2022",
  },
  {
    id: 3,
    avatar:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRb-tVpgHO9nYzyW8JaPyBvdbfIJGElM-9f-A&usqp=CAU",
    type: "SBI",
    cardNo: "32588***6",
    name: "Bhargav",
    expiry: "11/2023",
  },
  {
    id: 4,
    avatar:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSW2ZlDd6-brYy8-FhdljcWE4dspUj772I21Q&usqp=CAU",
    type: "HDFC",
    cardNo: "42972***5",
    name: "Sravan",
    expiry: "10/2021",
  },
  {
    id: 5,
    avatar:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkVQfgqXeWs6u0_HLyEdYC4Lh_2_n2y6dt7Q&usqp=CAU&reload=on",
    type: "AXIS BANK",
    cardNo: "31468***9",
    name: "Rithwik",
    expiry: "12/2023",
  },
  {
    id: 6,
    avatar:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSx0AwMt5cZmTTZiqjzn_TN1mc5rsdVi6t6wg&usqp=CAU",
    type: "ICICI",
    cardNo: "45862***0",
    name: "Alex",
    expiry: "12/2021",
  },
  {
    id: 7,
    avatar:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0tpvYMx8tLtvA4TFJR3eqfCDrfFrm8CCqMg&usqp=CAU",
    type: "KOTAK MAHINDRA",
    cardNo: "01234***2",
    name: "Joey",
    expiry: "1/2023",
  },
  {
    id: 8,
    avatar:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTM0qI4WO2zaMc-DNmZoP3q8AYM9mItszx_Rg&usqp=CAU",
    type: "KARUR VYSYA",
    cardNo: "36974***5",
    name: "Chandler",
    expiry: "8/2022",
  },
  {
    id: 9,
    avatar:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIcAW3e5uT8W-1-y-GhQiBcBdrWlIKINUdXg&usqp=CAU",
    type: "ANDHRA BANK",
    cardNo: "23148***5",
    name: "Ross",
    expiry: "4/2022",
  },
  {
    id: 10,
    avatar:
    "https://bfsi.eletsonline.com/wp-content/uploads/2020/09/Bajaj-Finserv-inks-Kwik.ID-as-their-Exclusive-Video-KYC-Partner.jpg",
    type: "Bajaj Finance",
    cardNo: "35974***9",
    name: "Mahesh",
    expiry: "9/2022",
  },
];

const upi = [
  {
    id: 1,
    avatar:
      "https://play-lh.googleusercontent.com/k7yz57K2OxhNrPNKF2U18Zcv9rodOu7CfWh47U15FFUN8-_B0hQfXsM-BaLG0gOtvw=s180-rw",
    type: "PayTm",
    cardNo: "georgey75@paytm",
    name: "George",
    phoneNo: 123456789,
  },
  {
    id: 2,
    avatar:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNhDTdW326JcXKYweltkqa8teThw8vAzpInA&usqp=CAU",
    type: "Phonepay",
    cardNo: "ravindra23@gmail.com",
    name: "Ravindra",
    phoneNo: 6486728852,
  },
  {
    id: 3,
    avatar:
      "https://play-lh.googleusercontent.com/k7yz57K2OxhNrPNKF2U18Zcv9rodOu7CfWh47U15FFUN8-_B0hQfXsM-BaLG0gOtvw=s180-rw",
    type: "PayTm",
    cardNo: "Chetan25@gmail.com",
    name: "Chetan",
    phoneNo: 9999900158,
  },
  {
    id: 4,
    avatar:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNhDTdW326JcXKYweltkqa8teThw8vAzpInA&usqp=CAU",
    type: "Phonepay",
    cardNo: "bhargav258@gmail.com",
    name: "Bhargav",
    phoneNo: 9912052483,
  },
  {
    id: 5,
    avatar:
      "https://storage.googleapis.com/gweb-uniblog-publish-prod/images/GooglePay_Lockup.max-1200x1200.png",
    type: "GooglePay",
    cardNo: "sravan54@gmail.com",
    name: "Sravan",
    phoneNo: 3312588961,
  },
  {
    id: 6,
    avatar:
      "https://play-lh.googleusercontent.com/k7yz57K2OxhNrPNKF2U18Zcv9rodOu7CfWh47U15FFUN8-_B0hQfXsM-BaLG0gOtvw=s180-rw",
    type: "PayTm",
    cardNo: "rithwik238@gmail.com",
    name: "Rithwik",
    phoneNo: 7674038678,
  },
  {
    id: 7,
    avatar:
    "https://storage.googleapis.com/gweb-uniblog-publish-prod/images/GooglePay_Lockup.max-1200x1200.png",
    type: "GooglePay",
    cardNo: "mahesh028@gmail.com",
    name: "Mahesh",
    phoneNo: 6456385852,
  },
  {
    id: 8,
    avatar:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNhDTdW326JcXKYweltkqa8teThw8vAzpInA&usqp=CAU",
    type: "Phonepay",
    cardNo: "joey30@gmsil.com",
    name: "joey",
    phoneNo: 5582436910,
  },
  {
    id: 9,
    avatar:
      "https://play-lh.googleusercontent.com/k7yz57K2OxhNrPNKF2U18Zcv9rodOu7CfWh47U15FFUN8-_B0hQfXsM-BaLG0gOtvw=s180-rw",
    type: "PayTm",
    cardNo: "Chandler62@gmail.com",
    name: "Chandler",
    phoneNo: 1239876540,
  },
  {
    id: 10,
    avatar:
      "https://storage.googleapis.com/gweb-uniblog-publish-prod/images/GooglePay_Lockup.max-1200x1200.png",
    type: "GooglPay",
    cardNo: "Ross87@gmail.com",
    name: "Ross",
    phoneNo: 7896441238,
  },
];

const myOrders = [
  {
    id: 1,
    avatar:
      "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/iphone-13-pro-max-gold-select?wid=470&hei=556&fmt=png-alpha&.v=1631652956000",
    name: "Iphone 13 Pro Max",
    quantity: 1,
    seller: "Apple",
    adress: "ABC Street",
    price: 1000,
    status: "Delivered on 19th November",
  },
  {
    id: 2,
    avatar:
      "https://rukminim1.flixcart.com/image/312/312/kqqykcw0/television/1/f/n/kd-65x80j-sony-original-imag4p2wxahgfgmf.jpeg?q=70",
    name: "SONY X80J 164 cm (65 inch) Ultra HD (4K) LED Smart TV  (KD-65X80J)",
    quantity: 1,
    seller: "SONY",
    adress: "Hyderabad",
    price:  110990,
    status: "Delivered on 20th November",
  },
  {
    id: 3,
    avatar:
    "https://rukminim1.flixcart.com/image/612/612/kj7gwi80/gamingconsole/n/3/c/cfi-1008b01r-825-sony-no-original-imafytxenahqnnpu.jpeg?q=70",
    name: "SONY PlayStation 5 (CFI-1008B01R) 825 GB with Astro's Playroom",
    quantity: 1,
    seller: "SONY",
    adress: "Ananthauram",
    price: 39990,
    status: "Delivered on 15th August",
  },
  {
    id: 4,
    avatar:
    "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
    name: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
    quantity: 1,
    seller: "Fjallraven",
    adress: "Vizag",
    price: 109,
    status: "Delivered on 9th September",
  },
  {
    id: 5,
    avatar:
    "https://assets.myntassets.com/f_webp,dpr_1.0,q_60,w_210,c_limit,fl_progressive/assets/images/1353004/2018/9/18/a8acac3a-077a-400f-a1c7-519215a5265e1537251707732-Roadster-Men-Blue-Denim-Washed-Casual-Shirt-5281537251705552-1.jpg",
    name: "Men Blue Regular Fit Faded Casual Denim Shirt",
    quantity: 1,
    seller: "Denim",
    adress: "Guntur",
    price: 1199,
    status: "Delivered on 1st december",
  },
  {
    id: 6,
    avatar:
    "https://assets.myntassets.com/f_webp,dpr_1.0,q_60,w_210,c_limit,fl_progressive/assets/images/12247308/2021/6/4/f210363f-8c55-42bc-a6f0-238077c18bc41622789741703-UNDER-ARMOUR-Men-Sports-Shoes-8471622789741281-5.jpg",
    name:  "Men Black & Charcoal Grey HOVR Apex 2 Woven Design & Striped Training Shoes",
    quantity: 1,
    seller: "Under Armor",
    adress: "Los Angeles",
    price: 223.55,
    status: "Delivered on 3rd june",
  },
  {
    id: 7,
    avatar:
    "https://assets.myntassets.com/f_webp,dpr_1.0,q_60,w_210,c_limit,fl_progressive/assets/images/productimage/2019/12/27/3c5bc598-2093-48df-8e7c-6329adf0c2661577401172457-1.jpg",
    name: "Men Grey Analogue Watch FC-775G4S4",
    quantity: 1,
    seller: "Fredirigue Constant",
    adress: "Chicago",
    price: 18000,
    status: "Delivered on 18th january",
  },
  {
    id: 8,
    avatar:
    "https://assets.myntassets.com/f_webp,dpr_1.0,q_60,w_210,c_limit,fl_progressive/assets/images/9803279/2019/10/11/08d246d9-80d1-4c61-8826-2074624aa0521570782280949-Apple-White-2nd-Gen-AirPods-with-Charging-Case-MV7N2HNA-1181-4.jpg",
    name:  "White 2nd Gen AirPods with Charging Case",
    quantity: 1,
    seller: "Apple",
    adress: "Jaipur",
    price: 21000,
    status: "Delivered on 19th may",
  },
  {
    id: 9,
    avatar:
    "https://assets.myntassets.com/f_webp,dpr_1.0,q_60,w_210,c_limit,fl_progressive/assets/images/6518755/2021/2/10/7249229f-5eb1-43dd-9c31-547d43f799c41612945435520-Philips-Men-Corded--Cordless-Rechargeable-Beard-Trimmer-BT32-1.jpg",
    name:  "Men BT3211/15 Series 3000 Rechargeable Beard Trimmer - Olive Green",
    quantity: 1,
    seller: "Philips",
    adress: "Rajasthan",
    price: 1399,
    status: "Delivered on 23rd August",
  },
  {
    id: 10,
    avatar:
    "https://rukminim1.flixcart.com/image/312/312/kuvkcy80/computer/x/s/4/na-gaming-laptop-acer-original-imag7whp2f8fgpaz.jpeg?q=70",
    name:  "acer Predator Helios 300 Octa Core i7 10th Gen - (16 GB/1 TB HDD/256 GB SSD/Windows 10 Home/6 GB Graphics/NVIDIA GeForce RTX 3060/144 Hz) PH315-53 Gaming Laptop  (15.6 inch, Black, 2.3 kg)",
    quantity: 1,
    seller: "Acer",
    adress: "Chennai",

    price: 63000,
    status: "Delivered on 12th February",
  },
];

export default userRows;
export { cards, upi, myOrders };
