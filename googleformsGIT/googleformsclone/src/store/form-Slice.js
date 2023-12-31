import { createSlice } from "@reduxjs/toolkit";

const formSlice = createSlice({
  name: "form",
  initialState: {
    questions: [
      {
        questiontext: "Question",
        questiontype: "Radio",
        options: [{ optiontext: "option1" }],
        open: true,
        required: false,
        answerkey: [],
        points: "",
        setAnswerKey: false,
        categories: [],
        items: [{ optiontext: "item1" }],
        belongsto: [{ optiontext: "catoption1" }],
        imageurl: [],
      },
    ],
    doc_name: "untitled document",
    doc_desc: "form description",
  },
  reducers: {
    addQuestion(state) {
      state.questions.push({
        questiontext: "Question",
        questiontype: "Radio",
        options: [{ optiontext: "option1" }],
        open: true,
        required: false,
        answerkey: [],
        points: "",
        setAnswerKey: false,
        categories: [],
        items: [{ optiontext: "item1" }],
        belongsto: [{ optiontext: "catoption1" }],
        imageurl: [],
      });
      console.log(state.questions);
    },
    changeQuestion(state, action) {
      state.questions[action.payload[1]].questiontext = action.payload[0];

      console.log(action.payload[0]);
      console.log(state.questions);
    },
    addOption(state, action) {
      var optionsQuestion = state.questions[action.payload];

      if (optionsQuestion.options.length < 5) {
        optionsQuestion.options.push({
          optiontext: "option" + (optionsQuestion.options.length + 1),
        });
      } else {
        alert("options limit reached!");
      }
    },
    addClozeOption(state, action) {
      var optionsQuestion = state.questions[action.payload[1]];

      //optionsQuestion.options=[];

      optionsQuestion.questionType = "radio";
      optionsQuestion.options.push({
        optiontext: action.payload[0],
      });
      optionsQuestion.options.map((opt) => {
        if (opt.optiontext === null) {
          console.log("empty opt");
        }
      });
      console.log(action.payload[0]);
      //   if (optionsQuestion.options.length < 5) {
      //     optionsQuestion.options.push({
      //       optiontext: "option" + (optionsQuestion.options.length + 1),
      //     });
      //   } else {
      //     alert("options limit reached!");
      //   }
    },
    changeFormName(state, action) {
      state.doc_name = action.payload;
    },
    changeoptionValue(state, action) {
      var optionsQuestion =
        state.questions[action.payload[1]].options[action.payload[2]];
      optionsQuestion.optiontext = action.payload[0];
    },
    changeCatoptionValue(state, action) {
      console.log(action.payload[0] + action.payload[1] + action.payload[2]);
      var optionsQuestion =
        state.questions[action.payload[1]].belongsto[action.payload[2]];
      optionsQuestion.optiontext = action.payload[0];
    },
    changeItemsValue(state, action) {
      var optionsQuestion =
        state.questions[action.payload[1]].items[action.payload[2]];
      optionsQuestion.optiontext = action.payload[0];
    },
    copyQuestion(state, action) {
      var newQuestion = state.questions[action.payload];
      state.questions.push(newQuestion);
    },
    deleteQuestion(state, action) {
      if (state.questions.length > 1) {
        console.log(action.payload + " delindex");
        state.questions.splice(action.payload, 1);
      }
    },
    requiredQuestion(state, action) {
      state.questions[action.payload].required =
        !state.questions[action.payload].required;
    },
    addQuestionType(state, action) {
      state.questions[action.payload[1]].questiontype = action.payload[0];
    },
    removeOption(state, action) {
      if (state.questions[action.payload[0]].options.length > 1) {
        state.questions[action.payload[0]].options.splice(action.payload[1], 1);
      }
    },
    setAsnwerKey(state, action) {
        state.questions[action.payload].setAnswerKey =
          !state.questions[action.payload].setAnswerKey;
    },
    setOption(state, action) {
      state.questions[action.payload[1]].answerkey.push(action.payload[0]);
    },
    closeAnswerKey(state, action) {
      state.questions[action.payload].setAnswerKey =
        !state.questions[action.payload].setAnswerKey;
    },
    setPoints(state, action) {
      state.questions[action.payload[0]].points = action.payload[1];
    },
    addItemOption(state, action) {
      var optionsQuestion = state.questions[action.payload];

      optionsQuestion.items.push({
        optiontext: "items" + (optionsQuestion.items.length + 1),
      });
    },
    removeItemOption(state, action) {
      if (state.questions[action.payload[0]].items.length > 1) {
        state.questions[action.payload[0]].items.splice(action.payload[1], 1);
      }
    },
    addCatOption(state, action) {
      var optionsQuestion = state.questions[action.payload];

      optionsQuestion.belongsto.push({
        optiontext: "catoption" + (optionsQuestion.belongsto.length + 1),
      });
    },
    removeCatOption(state, action) {
      if (state.questions[action.payload[0]].belongsto.length > 1) {
        state.questions[action.payload[0]].belongsto.splice(
          action.payload[1],
          1
        );
      }
    },
    addImage(state, action) {
      var Question = state.questions[action.payload[0]];
      Question.imageurl = action.payload[1];
    },
  },
});
export const formActions = formSlice.actions;
export default formSlice;
