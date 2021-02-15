import React, {useState} from 'react'
import axios from 'axios'


import './MeetingRoomTest.css'
import { render } from 'react-dom'

const MeetingRoomTest = () => {
    const [guestname, setGuestname] = useState(null)
    const [participant1, setParticipant1] = useState(null)
    const [participant2, setParticipant2] = useState(null)
    const [time, setTime] = useState(null)


    const handleSubmit = (e) => {

        axios({
            method: 'put',
            url: 'http://192.168.1.101:3001/price-tag/modifyProduct2/',
            data: {
              "ID": "123",
              "barcode": "123",
              "number": "123",
             "placeHolder28": time,	
             "placeHolder29": time !== null ? "Start Time:" : "",
             "placeHolder30": participant1 !== null ? "Participants:" : "",		
             "placeHolder32": participant2,	
              "placeHolder35": participant1,
              "placeHolder36": guestname,
             "placeHolder37": guestname !== null ? "Welcome:" : "",
             "placeHolder38": "Meeting Room",
             "storeUuid": "65"
            } 
        })
        .then(response => {
          //  res.statusCode = 200
            console.log(response)
            axios({   
                method: 'put',
                url: 'http://192.168.1.101:3001/price-tag/updateSingle/',
                data: {
                    "label1": "123",
                    "storeUuid": "65"
                } 
            })
            .then(response => {
            //  res.statusCode = 200
                console.log(response)
            //   res.setHeader('Content-Type', 'application/json')
            // res.send(JSON.stringify(response.data, null,3))
            })
                
         //   res.setHeader('Content-Type', 'application/json')
           // res.send(JSON.stringify(response.data, null,3))
        })
        .catch( error => {
        console.error(error)
        })

        
        e.preventDefault();
    }

    return(
            <form  onSubmit = {handleSubmit}>
                <div className='mainForm'>
                    <img src="/images/acsg_COLOR.png" alt=""/>
                    <h1>Meeting Room</h1>
                    <h2>Welcome:</h2>
                    <div className='mittomen'>
                        <input id="1" type="text" placeholder="Guest name" onChange={ e => setGuestname(e.target.value)} />
                        <div className='grid'>
                            <div className="grid-flex">
                                <h5>Participants:</h5>
                                <input id="2" type="text" placeholder="Participant" onChange={ e => setParticipant1(e.target.value)}/>
                                <input type="text" id="4"  placeholder="Participant" onChange={ e=> setParticipant2(e.target.value)} />
                            </div>
                            <div className='grid-flex'>
                                <h5>Time:</h5>
                                <input type="text" id="3"  placeholder="Time" onChange={ e => setTime(e.target.value)} />
                            </div>
                        </div>
                    </div>
                </div>
                <input id="5" type="submit" value="Refresh" />
            </form>
    )
}

export default MeetingRoomTest