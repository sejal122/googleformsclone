import React, { useEffect, useState } from "react";
import "./form_questions.scss";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  RadioGroup,
  Stack,
  Radio,
  Text,
  Button,
  Divider,
  FormLabel,
  Icon,
  Select,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  Input,
  position,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Tag,
  TagLabel,
  TagLeftIcon,
  TagRightIcon,
  TagCloseButton,
  HStack,
  Switch,
} from "@chakra-ui/react";

import {
  CopyIcon,
  DeleteIcon,
  DragHandleIcon,
  SmallCloseIcon,
  AddIcon,
  AttachmentIcon,
} from "@chakra-ui/icons";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { Form } from "react-router-dom";
import { Reorder } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { formActions } from "../store/form-Slice";
import axios from "axios"
import { useNavigate } from "react-router-dom";

function Form_questions() {
  const dispatch = useDispatch();
  const q = useSelector((state) => state.ques.questions);
  const getForm =useSelector((state)=>state)
  console.log(q);
  console.log(getForm)
  const [formName, setFormName] = useState("untitled Document");
  const [formDesc, setFormDesc] = useState("Form Description");
  const [newoption, setNewoption] = useState();
  const [questions, setQuestions] = useState();
  const [isCloze, setCloze] = useState(false);
  const [image, setImage] = useState({ preview: "", raw: "" });

  const handleImageChange = (e, i) => {
    if (e.target.files.length) {
      setImage({
        preview: URL.createObjectURL(e.target.files[0]),
        raw: e.target.files[0],
      });
    }
    
   
    dispatch(formActions.addImage([i, e.target.files[0]]));
    console.log(URL.createObjectURL(e.target.files[0]));
    console.log(e.target.files[0]);
  };
  //   [
  //   {
  //     questiontext: "what is the capital of India?",
  //     questiontype: "Radio",
  //     options: [{ optiontext: "Delhi" }, { optiontext: "Mumbai" }],
  //     open: false,
  //     required: false,
  //     answerkey: [],
  //     points: "",
  //     setAnswerKey: false,

  //   },
  //   {
  //     questiontext: "what is the capital of India?",
  //     questiontype: "Checkbox",
  //     options: [
  //       { optiontext: "Delhi" },
  //       { optiontext: "Mumbai" },
  //       { optiontext: "Banglore" },
  //       { optiontext: "Bengal" },
  //     ],
  //     open: false,
  //     required: false,
  //     answerkey: "",
  //     points: "",
  //     setAnswerKey: false,

  //   },
  // ]
  const [questiontype, setQuestionType] = useState("Radio");

  const handleCreateForm= async (e)=>{
    var currentURL = (document.URL); // returns http://myplace.com/abcd
    var part = currentURL.split("/")[1];
    e.preventDefault();
    try{
      if(q.length>=1){
        const response = await axios.post('http://localhost:8000/forms',{
          ...getForm
        },{})
        const success=response.status==201
        //if(success) navigate(`http://localhost:3001/${part}`)
      }
    }
    catch{

    }
    
  }
  function changeQuestion(text, i) {
    dispatch(formActions.changeQuestion([text, i]));
    // var newQuestion = [...questions];
    // newQuestion[i].questiontext = text;
    // setQuestions(newQuestion);
    // console.log(newQuestion);
  }
  function changeFormName(text) {
    dispatch(formActions.changeFormName([text]));
    // var newformName = [...questions];
    // newformName[i].formName = text;
    // setQuestions(newformName);
    // console.log(newformName);
  }
  function addOption(i) {
    dispatch(formActions.addOption(i));
    // var optionsQuestion = [...questions];
    // if (optionsQuestion[i].options.length < 5) {
    //   optionsQuestion[i].options.push({
    //     optiontext: "option" + (optionsQuestion[i].options.length + 1),
    //   });
    // }
    // setQuestions(optionsQuestion);
  }
  function onDragEnd(result) {
    if (!result.destination) {
      return;
    }
    var items = [...questions];
    const itemDragged = reorder(
      itemDragged,
      result.source.index,
      result.destination.index
    );
    setQuestions(itemDragged);
  }
  const reorder = (list, startindex, endIndex) => {
    const result = Array.form(list);
    const [removed] = result.splice(startindex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };
  function changeoptionValue(text, i, j) {
    dispatch(formActions.changeoptionValue([text, i, j]));
    // var optionsQuestion = [...questions];
    // optionsQuestion[i].options[j].optiontext = text;
    // setQuestions(optionsQuestion);
    // console.log(optionsQuestion);
  }
  function changeItemsValue(text, i, j) {
    dispatch(formActions.changeItemsValue([text, i, j]));
  }
  function changeCatoptionValue(text, i, j) {
    dispatch(formActions.changeCatoptionValue([text, i, j]));
  }
  function copyQuestion(i) {
    dispatch(formActions.copyQuestion(i));
    // let ques = [...questions];
    // var newQuestion = ques[i];
    // setQuestions([...questions, newQuestion]);
  }
  function deleteQuestion(i) {
    dispatch(formActions.deleteQuestion(i));
    // let ques = [...questions];
    // if (questions.length > 1) {
    //   ques.splice(i, 1);
    // }
    // setQuestions(ques);
  }
  function requiredQuestion(i) {
    dispatch(formActions.requiredQuestion(i));
    // var reqQues = [...questions];
    // reqQues[i].required = !reqQues[i].required;
    // setQuestions(reqQues);
    // console.log(reqQues[i].required);
  }
  function addQuestionType(type, i) {
    dispatch(formActions.addQuestionType([type, i]));
    // let ques = [...questions];
    // ques[i].questiontype = type;
    // setQuestions(ques);
    // console.log(type);
    // setQuestionType(type);
  }
  function addquestions() {
    dispatch(formActions.addQuestion());
    // setQuestions(

    //[
    //   ...questions,
    //   {
    //     questiontext: "Question",
    //     questiontype: "Radio",
    //     options: [{ optiontext: "option1" }],
    //     open: true,
    //     required: false,
    //   },
    // ]
    // );
  }
  function addItemOption(i) {
    dispatch(formActions.addItemOption(i));
    dispatch(formActions.addCatOption(i));
  }
  function addCatOption(i) {
    dispatch(formActions.addCatOption(i));
  }
  function removeOption(i, j) {
    dispatch(formActions.removeOption([i, j]));
    // var removeOptionQuestion = [...questions];
    // if (removeOptionQuestion[i].options.length > 1) {
    //   removeOptionQuestion[i].options.splice(j, 1);
    //   setQuestions(removeOptionQuestion);
    // }
  }

  function removeItemOption(i, j) {
    dispatch(formActions.removeItemOption([i, j]));
  }
  function removeCatOption(i, j) {
    dispatch(formActions.removeCatOption([i, j]));
  }
  // function typeRadio() {
  //   return questions.map((ques, i) => {
  //     ques.options.map((option, j) => {
  //       return (
  //         <div className="questions" key={j}>
  //           <input
  //             type={ques.questiontype}
  //             id={option.optiontext}
  //             name="contact"
  //           />
  //           <input
  //             type="text"
  //             value={option.optiontext}
  //             onChange={(e) => changeoptionValue(e.target.value, i, j)}
  //             for="contactChoice1"
  //           ></input>
  //         </div>
  //       );
  //     });
  //   });
  // }
  function setAsnwerKey(i) {
    dispatch(formActions.setAsnwerKey(i));
    // let ques = [...questions];
    // ques[i].setAnswerKey = true;
    // setQuestions(ques);
  }
  function setOption(ans, i) {
    dispatch(formActions.setOption([ans, i]));
    // let ques = [...questions];
    // ques[i].answerkey = ans;
    // setQuestions(ques);
  }
  function closeAnswerKey(i) {
    dispatch(formActions.closeAnswerKey(i));
    // let ques = [...questions];
    // ques[i].setAnswerKey = !ques[i].setAnswerKey;
    // setQuestions(ques);
    // console.log(ques);
  }
  function setPoints(i, val) {
    console.log(typeof val + val);
    dispatch(formActions.setPoints([i, val]));

    // let ques = [...questions];
    // ques[i].points =val;
    // setQuestions(ques);
    // console.log(ques);
  }
  function handleMouseUp(i) {
    console.log(`Selected text: ${window.getSelection().toString()}`);
    let opt = ` ${window.getSelection().toString()}`;
    dispatch(formActions.addClozeOption([opt, i]));
  }
  const navigate=useNavigate()
  function createForm() {}
  function questionUI() {
    return q.map((ques, i) => {
      return (
        <div id={i + "id"} key={i}>
          <Accordion defaultIndex={[0]}>
            <AccordionItem>
              <h2>
                <AccordionButton>
                  <Box as="span" flex="1" textAlign="left">
                    {isCloze ? (
                      <div>
                        {/* <p>Select the word that you want to leave blank in the form</p> */}
                        <input
                          onMouseUp={() => handleMouseUp(i)}
                          onChange={(e) => changeQuestion(e.target.value, i)}
                          required={ques.required}
                          className={"questiontextInput"}
                          value={q.questiontext}
                          placeholder={ques.questiontext}
                        ></input>
                      </div>
                    ) : (
                      <div>
                        <input
                          onChange={(e) => changeQuestion(e.target.value, i)}
                          required={ques.required}
                          className={"questiontextInput"}
                          value={q.questiontext}
                          placeholder={ques.questiontext}
                        ></input>
                        <div>
                          <label htmlFor="upload-button">
                            {image.preview ? (
                              <img
                                src={image.preview}
                                alt="dummy"
                                width="300"
                                height="300"
                              />
                            ) : (
                              <>
                                <span className="fa-stack fa-2x mt-3 mb-2">
                                  <i className="fas fa-circle fa-stack-2x" />
                                  <i className="fas fa-store fa-stack-1x fa-inverse" />
                                </span>
                                <AttachmentIcon />
                                {/* <h5 className="text-center">Upload your photo</h5> */}
                              </>
                            )}
                          </label>
                          <input
                            type="file"
                            accept="image/*"
                            id="upload-button"
                            style={{ display: "none" }}
                            onChange={(e) => {
                              handleImageChange(e, i);
                            }}
                          />
                          <br />
                        </div>
                      </div>
                    )}
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              {}
              {ques.questiontype === "categorize" ? <div>Categorise</div> : ""}
              <AccordionPanel pb={4}>
                <Stack h="fit-content">
                  <div key={i}>
                    {" "}
                    {ques.options.map((option, j) => {
                      return (
                        <div className="answerInput">
                          {ques.questiontype === "Radio" ||
                          ques.questiontype === "Checkbox" ? (
                            <div className="questions" key={j}>
                              <input
                                type={ques.questiontype}
                                id={option.optiontext}
                                value={ques.optiontext}
                                name="contact"
                                onChange={(value) =>
                                  setOption(value.target.id, i)
                                }
                              />
                              <input
                                type="text"
                                value={option.optiontext}
                                onChange={(e) => {
                                  changeoptionValue(e.target.value, i, j);
                                }}
                                htmlFor="contactChoice1"
                              ></input>
                            </div>
                          ) : ques.questiontype === "text" ? (
                            <div>
                              <input
                                type={ques.questiontype}
                                id={option.optiontext}
                                name="contact"
                              />
                            </div>
                          ) : ques.questiontype === "categorize" ? (
                            <div>
                              <input
                                type="text"
                                value={option.optiontext}
                                onChange={(e) => {
                                  changeoptionValue(e.target.value, i, j);
                                }}
                                htmlFor="contactChoice1"
                              ></input>
                            </div>
                          ) : ques.questiontype === "cloze" ? (
                            ques.options.length >= 1 ? (
                              <div>
                                {" "}
                                <input
                                  type="radio"
                                  id={option.optiontext}
                                  value={ques.optiontext}
                                  name="contact"
                                  onChange={(value) =>
                                    setOption(value.target.id, i)
                                  }
                                />
                                <input
                                  type="text"
                                  value={option.optiontext}
                                  onChange={(e) => {
                                    changeoptionValue(e.target.value, i, j);
                                  }}
                                  htmlFor="contactChoice1"
                                ></input>
                              </div>
                            ) : (
                              ""
                            )
                          ) : (
                            ""
                          )}

                          <button>
                            <Icon
                              onClick={() => removeOption(i, j)}
                              style={{ color: "grey" }}
                              as={SmallCloseIcon}
                            />
                          </button>
                        </div>
                      );
                    })}
                    {q[i].setAnswerKey ? (
                      <div>
                        {q[i].questiontype != "text" ? (
                          <div className="answerKey">
                            Choose correct option and hit done!
                            <NumberInput
                              min={0}
                              style={{
                                width: "80px",
                                border: "1px solid grey",
                              }}
                              value={ques.points}
                              onChange={(value) => setPoints(i, value)}
                            >
                              <NumberInputField style={{ width: "50px" }} />
                              <NumberInputStepper>
                                <NumberIncrementStepper />
                                <NumberDecrementStepper />
                              </NumberInputStepper>
                            </NumberInput>
                            <Button
                              className="addoptionBtn"
                              onClick={() => closeAnswerKey(i)}
                            >
                              Done
                            </Button>
                          </div>
                        ) : (
                          <div className="answerKey">
                            {" "}
                            You cannot add answer key to input type Paragraph
                          </div>
                        )}
                      </div>
                    ) : (
                      ""
                    )}
                    {ques.options.length < 5 ? (
                      <div>
                        <Button
                          className="addoptionBtn"
                          onClick={() => addOption(i)}
                        >
                          add option
                        </Button>{" "}
                      </div>
                    ) : (
                      ""
                    )}
                    {ques.questiontype === "categorize" ? (
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <div className="catQuestionBlock">
                          <p>
                            <b>Item</b>
                          </p>
                          <br />
                          {ques.items.map((option, j) => {
                            return (
                              <div className="answerInput">
                                {ques.questiontype === "Radio" ||
                                ques.questiontype === "Checkbox" ? (
                                  <div className="questions" key={j}>
                                    <input
                                      type={ques.questiontype}
                                      id={option.optiontext}
                                      value={ques.optiontext}
                                      name="contact"
                                      onChange={(value) =>
                                        setOption(value.target.id, i)
                                      }
                                    />
                                    <input
                                      type="text"
                                      value={option.optiontext}
                                      onChange={(e) => {
                                        changeoptionValue(e.target.value, i, j);
                                      }}
                                      htmlFor="contactChoice1"
                                    ></input>
                                  </div>
                                ) : ques.questiontype === "text" ? (
                                  <div>
                                    <input
                                      type={ques.questiontype}
                                      id={option.optiontext}
                                      name="contact"
                                    />
                                  </div>
                                ) : ques.questiontype === "categorize" ? (
                                  <div>
                                    <input
                                      type="text"
                                      value={option.optiontext}
                                      onChange={(e) => {
                                        changeItemsValue(e.target.value, i, j);
                                      }}
                                      htmlFor="contactChoice1"
                                    ></input>
                                  </div>
                                ) : (
                                  ""
                                )}

                                <button>
                                  <Icon
                                    onClick={() => removeItemOption(i, j)}
                                    style={{ color: "grey" }}
                                    as={SmallCloseIcon}
                                  />
                                </button>
                              </div>
                            );
                          })}
                          <div>
                            <br />
                            <Button
                              className="addoptionBtn"
                              onClick={() => addItemOption(i)}
                            >
                              add item
                            </Button>{" "}
                          </div>
                        </div>
                        <div className="catQuestionBlock">
                          <p>
                            <b>Belongs to</b>
                          </p>
                          <br />
                          {ques.belongsto.map((option, j) => {
                            return (
                              <div className="answerInput">
                                {ques.questiontype === "Radio" ||
                                ques.questiontype === "Checkbox" ? (
                                  <div className="questions" key={j}>
                                    <input
                                      type={ques.questiontype}
                                      id={option.optiontext}
                                      value={ques.optiontext}
                                      name="contact"
                                      onChange={(value) =>
                                        setOption(value.target.id, i)
                                      }
                                    />
                                    <input
                                      type="text"
                                      value={option.optiontext}
                                      onChange={(e) => {
                                        changeoptionValue(e.target.value, i, j);
                                      }}
                                      htmlFor="contactChoice12"
                                    ></input>
                                  </div>
                                ) : ques.questiontype === "text" ? (
                                  <div>
                                    <input
                                      type={ques.questiontype}
                                      id={option.optiontext}
                                      name="contact"
                                    />
                                  </div>
                                ) : ques.questiontype === "categorize" ? (
                                  <div>
                                    {/* <input
                                      type="text"
                                      value={option.optiontext}
                                      onChange={(e) => {
                                        changeoptionValue(e.target.value, i, j);
                                      }}
                                      for="contactChoice1"
                                    ></input> */}
                                    <Select
                                      className="catSelect"
                                      onChange={(e) =>
                                        changeCatoptionValue(
                                          e.target.value,
                                          i,
                                          j
                                        )
                                      }
                                      placeholder="category"
                                    >
                                      {ques.options.map((text) => {
                                        return (
                                          <option value={text.optiontext}>
                                            {text.optiontext}
                                          </option>
                                        );
                                      })}
                                    </Select>
                                  </div>
                                ) : (
                                  ""
                                )}
                                <button>
                                  <Icon
                                    onClick={() => removeCatOption(i, j)}
                                    style={{ color: "grey", margin: "5px" }}
                                    as={SmallCloseIcon}
                                  />
                                </button>
                              </div>
                            );
                          })}
                          {/* <div>
                            <Button
                              className="addoptionBtn"
                              onClick={() => addCatOption(i)}
                            >
                              add item
                            </Button>{" "}
                          </div> */}
                        </div>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                  <Divider orientation="vertical"></Divider>
                  <Text>
                    <HStack spacing={4}>
                      <Button onClick={() => setAsnwerKey(i)}> key</Button>
                      <Tag
                        type="button"
                        onClick={() => copyQuestion(i)}
                        size="md"
                        key="md"
                      >
                        <Icon as={CopyIcon} />
                      </Tag>
                      <Tag onClick={() => deleteQuestion(i)} size="md" key={i}>
                        <Icon as={DeleteIcon} />
                      </Tag>
                      <FormControl display="flex" alignItems="center">
                        <FormLabel htmlFor="required" mb="0">
                          Required
                        </FormLabel>
                        <Switch
                          onChange={() => requiredQuestion(i)}
                          colorScheme="blue"
                          id="requiredInput"
                        />
                      </FormControl>
                      <Select
                        defaultValue="radio"
                        onChange={(e) => {
                          addQuestionType(e.target.value, i);
                          if (e.target.value === "cloze") {
                            setCloze(true);
                          }
                        }}
                        size="xs"
                        value={ques.questiontype}
                        placeholder="Select input type"
                      >
                        <option value="text">Paragraph</option>
                        <option value="Radio">Radio</option>
                        <option value="Checkbox">Checkbox</option>
                        <option value="categorize">Categorize</option>
                        <option value="cloze">Cloze</option>
                      </Select>
                    </HStack>
                  </Text>
                </Stack>
                <div>{}</div>
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        </div>
      );
    });
  }
  return (
    <div className="formquestions">
      <div className="sectionTitle">
        <div className="section">
          <div className="title">
            <input
              style={{ textAlign: "center" }}
              type="text"
              value={q.doc_name}
              onChange={(e) => changeFormName(e.target.value)}
              placeholder="Untitled Document"
              className="titleInput"
            ></input>
            <input
              type="text"
              value={formDesc}
              onChange={(e) => setFormDesc(e.target.value)}
              placeholder="Form description"
              className="formdescriptionInput"
            ></input>
          </div>
        </div>
      </div>

      <div>{questionUI()}</div>
      <div type="button" onClick={addquestions} className="addquestionDiv">
        <AddIcon boxSize={4} />
        <Text>Add question</Text>
      </div>
      <div
        type="button"
        onClick={handleCreateForm}
        style={{ backgroundColor: "white", border: "1px solid #DAC0A3" }}
        className="addquestionDiv"
      >
        <Text>Create form</Text>
      </div>
    </div>
  );
}

export default Form_questions;
