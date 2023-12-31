import React from 'react'
import './mystyles.scss'
import { Button, ButtonGroup } from '@chakra-ui/react'
import { Input } from '@chakra-ui/react'
import { Show, Hide } from '@chakra-ui/react'
function Header() {
    return (
        <div className='header'>
           <Hide breakpoint='(max-width: 450px)'><div className='header_name'>FORMS</div></Hide>
           {/* <div className='header_mid'><Input placeholder='Search' /></div> */}
           <div className='header_right'>
            <Button>My forms</Button>
            <Button>My responses</Button>
           </div>
            </div>
    )
}

export default Header
