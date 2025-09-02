# Project Structure

## Features

- CRUD User </
- CRUD Post </
- Login & Signup </
- Authentication & RestrictTo
- Create First Admin
- Upload Image Post
- Handle with MVC
- Postman Collections (User, Post, Auth) </
- Rate Limit (Bonus)

---

## User & Post Schema

```js
{
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  bio: { type: String },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ['admin', 'user'],
    default: "user",
    require: true
  }
}

{
  title: { type: String, required: true },
  content: { type: String, unique: true, required: true },
  autherId: {
       type: mongoose.Schema.Types.ObjectId,
       ref: "User",
       required: true,
        },
  image :{type:string}
 }
```

## must found
# code && postman 3 files (User, Post, Auth) && link github && link server && env file



talk to me about these topics in nodejs how do i add them to my project 

- Authentication & RestrictTo
- Create First Admin
- Upload Image Post
- Handle with MVC