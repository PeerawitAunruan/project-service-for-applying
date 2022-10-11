โปรแกรมที่ใช้ เเละการใช้งาน API

จากโจทย์ที่ได้รับมอบหมายให้ออกแบบระบบการจอง service ต่างๆ โดยจะต้องมีระบบดังนี้
1. Register & Login
2. List of services 
3. Booking
ทางผมได้ออกแบบมา โดยใช้ Tool Nodejs เเล้วภาษา JavaScript ในการเขียนคำสั่ง เเละติดตั้ง libary เเละ Framework อื่นเข้าไปด้วย
    "bcryptjs": "^2.4.3",
    "dotenv": "^16.0.3",
    "express": "^4.18.1",
    "jsonwebtoken": "^8.5.1",
    "mongoose": "^6.6.5"--------------------> อันนี้จะเป็นโปรแกรม Database ที่ใช้ (mongo atlas) เป็นการใช้ DB on cloud
    
ไฟล์ที่ config Database จะอยู่ในไฟล์ชื่อ /config/database.js
ไฟล์ที่ midleware ที่ใช้ในการ Authentication จะอยู่ในไฟล์ชื่อ /midleware/auth.js
ไฟล์ที่ add ข้อมูล Database จะอยู่ในไฟล์ชื่อ /model จะมีไฟล์ต่างๆ ที่ config ข้อมูลลงไปใน database booking.js, user.js, service.js

การทำ Authentication ทางผมได้ออกแบบในการ set header เป็น x-access-token เเละตามด้วย Token ที่ได้มาตอน Login
ในส่วนของ port ที่ใช้งาน จะใช้เป็น port
