import axios from 'axios'
import React, { useState } from 'react'
import { Button, Card, Form } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom';
function Addtodo() {
    const location = useLocation();
    let datas = location?.state?.data;
  
  console.log(datas,"1234")
    const [task, setTask] = useState('')
    const [date, setDate] = useState('')
    const [status, setStatus] = useState('Pending...')
    
  
     const history=useNavigate()
 
     const AddTodoo=async()=>{
        const addtask=await axios.post('http://localhost:4000/createtask',{task,date,status})
        console.log(addtask.data);
     
    }

    const handleClose = () => {

        history(`/`)
        datas={}
      };
      
  return (
    <div style={{display:"flex"}}>
    
    <Card className="card border-secondary mx-auto mt-3 " style={{width:"80%"}}>
      <Card.Body className="d-flex flex-column align-items-center">
    
    <Form className="w-100">
      <Form.Group controlId="Name">
        <Form.Label>TASK</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter The Task "
          value={task||datas?.task}
          onChange={(e)=>setTask(e.target.value)}
          required
          disabled={datas?.task?true:false}
        />
      </Form.Group>

      <Form.Group controlId="date1">
        <Form.Label>DATE</Form.Label>
        <Form.Control
          type="date"
          placeholder="Enter Task Date"
          value={date||datas?.date}
          onChange={(e)=>setDate(e.target.value)}
          required
          disabled={datas?.date?true:false}
        />
      </Form.Group>
 

<Form.Group controlId="status">
     <Form.Label>STATUS</Form.Label>
    <Form.Control as="select" value={status} onChange={(e) => setStatus(e.target.value)} disabled>
    <option value="Pending..">{datas?.status?datas?.status:"Pending..."}</option> 
      </Form.Control>
    </Form.Group>

   
<Link to="/">
  <Button type="submit" onClick={AddTodoo} variant="light"  className="btn-lg btn-block mt-4">
    Submit
  </Button>
</Link>
 {" "}
      <Button
            variant="danger"
            type="submit"
            className="btn-lg btn-block  mt-4"
            onClick={handleClose}
          >Cancel</Button>
    </Form>
    </Card.Body>
    </Card>
    </div>
  )
}

export default Addtodo