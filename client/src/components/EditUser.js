import React from 'react'

export default function EditUser() {
    return (
        <div>
        <h1>edit user</h1>
        <form>
         <label>first Name</label>
        <input type="text" name="firstName"   />
        <label>age</label>
        <input type="text" name="age"   />
        <label>Company id</label>
        <input type="text" name="companyId"   />
        
        <button type="submit" >update user</button>
        </form>
     </div>
    )
}
