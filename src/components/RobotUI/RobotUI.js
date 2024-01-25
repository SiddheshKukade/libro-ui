import React, { useEffect, useState } from "react";
//TODO: to local speech recognition without internet
import SpeechRecognition, {
    useSpeechRecognition,
} from "react-speech-recognition";
import Dictaphone from "../../Dictaphone";
import "./RobotUI.css";
import { FaMicrophone } from "react-icons/fa";
import Keyboard from "../Keyboard/Keyboard";
import Header from "../Header/Header";
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
    useEffect(()=>{
        setInputText(transcript)
    }, [listening])

    const onClickHandlerMic = () => SpeechRecognition.startListening;
    if (!browserSupportsSpeechRecognition) {
        return <span>Browser doesn't support speech recognition.</span>;
    }
    return (
        <div className="robot-screen">
            {/* <Dictaphone /> */}
<Header/>
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
        </div>
    );
};

export default RobotUI;
