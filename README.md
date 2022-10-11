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

การทำ Authentication ทางผมได้ออกแบบโดยใช้ Jsonwebtoken เพื่อนำ token ที่ได้จากการ login มา set header เป็น x-access-token เเละตามด้วย Token ที่ได้มาตอน Login
ในส่วนของ port ที่ใช้งาน จะใช้เป็น port 5001 ข้อมูลดูได้ที่ไฟล์.env
___________________________________________________________________________________________________________________________

ไฟล์ App.js จะเป็นไฟล์ที่เก็บคำสั่งการใช้ function รวมถึงการกำหนด API
การทดสอบ
---------
"Register & Login system"
api เทสระบบ Register: 123.123.123.123/v1/auth/register (ใช้ method Post) การ encrypt จะใช้ libary "bcrypt" ในการแปลงรหัส
            {
            "fullName":"",
            "username":"",
            "password":""
            }

api เทสระบบ login: 123.123.123.123/v1/auth/signin (ใช้ method Post) จะต้องมี token ออกมา
            {
            "username":"",
            "password":""
            }
___________________________________________________________________________________________________________________________

"Services"
api เรียกดู service ทั้งหมด: 123.123.123.123/v1/services (ใช้ method GET)
api เเรียกดู service บางรายการ: 123.123.123.123/v1/services/:_id (ใช้ method GET)
api เพิ่ม service (อันนี้เพิ่มขึ้นมาเอง): 123.123.123.123/v1/add-service จะต้องมี login เพื่อทำการ Authentication ก่อนที่จะเพิ่มข้อมูล (ใช้ method Post)
             {
              "name":,
              "price":,
              "picture":"",
              "description":""
            }
___________________________________________________________________________________________________________________________            

"Booking" การจองต้องมีการทำ Authentication ก่อนถึงจะสามารถทดสอบระบบได้ โดยการนำ token มาจากตอน login เเล้ว set header โดยใช้ x-access-token

api เทสระบบ การจอง: 123.123.123.123/v1/services/:_id/booking (ใช้ method Post)
    '-สารมารถใช้ ID ของ service ที่ต้องการจอง ใส่เข้าไปใน url ได้เลย เเละระบบจะระบุผู้จองได้ผ่านทาง Token ที่ส่งมา
api เรียกดู การจองทั้งหมด: 123.123.123.123/v1/orders (ใช้ method GET)
api เรีกยดู การจองบางรายการ: 123.123.123.123/v1/orders/:id (ใช้ method GET) 



