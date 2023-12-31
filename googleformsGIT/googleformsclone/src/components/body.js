import React, { useState } from "react";
import { ReactSVG } from "react";
import {
  List,
  ListItem,
  ListIcon,
  OrderedList,
  UnorderedList,
  Icon,
  Tooltip,
  Text
} from "@chakra-ui/react";
import { PhoneIcon, AddIcon, WarningIcon } from "@chakra-ui/icons";
import Table from "./table";
import TableTemplate from "./table";
import { Link } from "react-router-dom";
import Form_questions from "./form_questions";
import uuid from "react-uuid";
import { useNavigate } from 'react-router-dom'
function Body() {
  const navigate=useNavigate();
  const [newformurl,setFormurl]=useState();
  var shortcuts = ["AddIcon", "untitled form"];
  const CreateNewForm = () => {
    const uid=uuid();
    const form_url=`form-questions/${uid}`
    console.log(form_url)
   
    setFormurl(form_url)
   
  }
  return (
    <div>
      <div className="shortcuts">
      <Text className='subHeading templategal'>Template gallery</Text>
        <UnorderedList>
          <Link onClick={CreateNewForm} to={newformurl}>
          <ListItem className="shortcutsDiv">
            <Tooltip hasArrow label='Add form' bg='gray.300' color='black'>
            <svg
              className="svgaddicon"
              width="174"
              height="173"
              viewBox="0 0 174 173"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect x="78" width="18" height="173" fill="#F8F0E5" />
              <rect
                x="173.359"
                y="76.2319"
                width="18"
                height="173"
                transform="rotate(89.1593 173.359 76.2319)"
                fill="#F8F0E5"
              />
            </svg>
            </Tooltip>
        
          </ListItem>
          </Link>  
        
          {shortcuts.map((shortcut,i) => {
            return <ListItem key={i} className="shortcutsDiv"></ListItem>;
          })}
        </UnorderedList>
      </div>
      <div className="recentForms">
      <Text className='subHeading recentforms'> Recent forms</Text>
      <TableTemplate/>
      </div>
    </div>
  );
}

export default Body;
