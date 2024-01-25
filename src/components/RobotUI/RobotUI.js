import React, { useEffect, useState } from "react";

import SpeechRecognition, {
    useSpeechRecognition,
} from "react-speech-recognition";
import Dictaphone from "../../Dictaphone";
import "./RobotUI.css";
import { FaMicrophone } from "react-icons/fa";
import Keyboard from "../Keyboard/Keyboard";
const RobotUI = () => {
    const [searchTerm, setSearchTerm] = useState("");
	const [inputText, setInputText] = useState(''); 

    const [isKeyboardVisible, setKeyboardVisible] = useState(true);
    const [voiceSearchTerm, setVoiceSearchTerm] = useState("");
    const handleButtonClick = (buttonLabel) => {
        console.log(`Button ${buttonLabel} clicked`);
    };

    const handleSearchClick = () => {
        setKeyboardVisible(true);
    };

    const handleKeyboardButtonClick = (key) => {
        setSearchTerm(searchTerm + key);
    };

    const keyboardKeys = [
        "0",
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "Q",
        "W",
        "E",
        "R",
        "T",
        "Y",
        "U",
        "I",
        "O",
        "P",
        "A",
        "S",
        "D",
        "F",
        "G",
        "H",
        "J",
        "K",
        "L",
        "Z",
        "X",
        "C",
        "V",
        "B",
        "N",
        "M",
        "<",
        ">",
    ];
    const {
        transcript,
        listening,
        resetTranscript,
        browserSupportsSpeechRecognition,
    } = useSpeechRecognition();

    const onClickHandlerSetVoiceInput = () => {
        setVoiceSearchTerm(transcript);
    };
    useEffect(() => {
        setSearchTerm(voiceSearchTerm);
    }, [voiceSearchTerm]);


    const onClickHandlerMic = () => SpeechRecognition.startListening;
    if (!browserSupportsSpeechRecognition) {
        return <span>Browser doesn't support speech recognition.</span>;
    }
    return (
        <div className="robot-screen">
            {/* <Dictaphone /> */}

            <h1 className="header2"> Libro: The Library Assistant </h1>
            <br />
            {listening ? (
                <p className="pgreen">Currently Speaking: {transcript}</p>
            ) : (
                <></>
            )}
            <div className="button-row">
                <button
                    className="button"
                    onClick={() => handleButtonClick("Button 1")}
                >
                    Home
                </button>
                <button
                    className="button"
                    onClick={() => handleButtonClick("Button 2")}
                >
                    Tutorial
                </button>
                <button
                    className="button"
                    onClick={() => handleButtonClick("Button 3")}
                >
                    Books
                </button>
            </div>
            <div className="search-bar">
                {/* <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onClick={handleSearchClick}
          placeholder="Ask me a question..."
        /> */}

                <FaMicrophone
                    onClick={SpeechRecognition.startListening}
                    className="voice-icon"
                />

                <button
                    className="btngood"
                    onClick={() => {
                        onClickHandlerSetVoiceInput();
                    }}
                >
                    <button
                        className="button_1"
                        onClick={SpeechRecognition.stopListening}
                    >
                        Submit
                    </button>
                </button>
                <button className="button_1" onClick={resetTranscript}>
                    Reset
                </button>
            </div>
            <Keyboard searchTerm={searchTerm} setSearchTerm={setSearchTerm} handleSearchClick={handleSearchClick}  setInputText={setInputText} inputText={inputText} />
            {/* {isKeyboardVisible && (
      
          {keyboardKeys.map((key) => (
            <button
              className="keyboard-button"
              key={key}
              onClick={() => handleKeyboardButtonClick(key)}
            >
              {key}
            </button>
          ))}
        </div>
      )} */}
            {/* <div className="keyboard"> */}

            {/* </div> */}
        </div>
    );
};

export default RobotUI;
