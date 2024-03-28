import logo from "./logo.svg";
import { useState, useEffect } from "react";
import {
  Button,
  InputNumber,
  Input,
  Card,
  Alert,
  Space,
  Col,
  Divider,
  Row,
  notification,
  Modal
} from "antd";
import "./App.css";
import bg from "./card.png";
import bg_insider from "./insider.jpg";
import logo_insider from "./InsiderLogo.jpg";
import { EyeFilled, QuestionOutlined } from '@ant-design/icons';

let initial = [
  { id: 0, name: 'circle' },
  { id: 1, name: 'square' },
  { id: 2, name: 'circle' },
];

function App() {
  const { Meta } = Card;
  const [count, setCount] = useState(0);
  const [modalName, setModalName] = useState(false);
  const [secretWord, setSecretWord] = useState("");
  const [nameOnCard, setNameOnCard] = useState("");
  const [playerGuess, setPlayerGuess] = useState("");
  const [insiderHint, setInsiderHint] = useState("");
  const [player, setPlayer] = useState("");
  const [name, setName] = useState([]);
  const [charactor, setCharactor] = useState([]);
  const [gameState, setGameState] = useState("waiting"); // Can be 'waiting', 'playing', 'finished'

  const [status, setStatus] = useState(true);
  const [flipingCard, setFlipingCard] = useState(false);

  const [cardStatus, setCardStatus] = useState([]);

  const [alert, setAlert] = useState(false);
  const [timeOver, setTimeOver] = useState(false);
  const [countDown, setCountDown] = useState(0);
  const [runTimer, setRunTimer] = useState(false);

  const togglerTimer = () => setRunTimer((t) => !t);

  const seconds = String(countDown % 60).padStart(2, 0);
  const minutes = String(Math.floor(countDown / 60)).padStart(2, 0);

  var chooseCard = [];

  useEffect(() => {
    let timerId;

    if (runTimer) {
      setCountDown(60 * 5);
      timerId = setInterval(() => {
        setCountDown((countDown) => countDown - 1);
      }, 1000);
    } else {
      clearInterval(timerId);
    }

    return () => clearInterval(timerId);
  }, [runTimer]);

  useEffect(() => {
    if (countDown < 0 && runTimer) {
      console.log("expired");

      setTimeOver(true);
      setRunTimer(false);
      setCountDown(0);
    }
  }, [countDown, runTimer]);

  const style = {
    background: "#0092ff",
    padding: "8px 0",
  };

  const onChangePlayer = (e) => {
    // console.log(parseFloat(e.target.value));
    setPlayer(parseFloat(e.target.value))
  }

  const submitPlayer = () => {
    let players = parseFloat(player);
    // let arrName = []
    

    if (players < 10 ) {
      // for (let index = 0; index < players; index++) {
      //   arrName.push({
      //     id: index+1,
      //     name: ''
      //   })
      // }
      // setName(arrName)
      // setModalName(true)
      setGameState("word");
    } else {
      setAlert(true);
    }
  };

  const renderInput = (value) => {
    const inputs=[];
    // for (let index = 0; index < array.length; index++) {
      
    // }
    for(let i=0; i<value; i++){
      inputs.push(<div style={{marginBottom: '10px'}}><Input placeholder={'Player-'+(i+1)} key={i+1} className={'player-'+(i+1)} /></div>)
    }
    return inputs;
  }

  const submitName = () => {
    let arr = []
    for (let index = 0; index < player; index++) {
      // arr.push({
      //   id: index + 1,
      //   name: document.getElementsByClassName("player-" + (index+1))[0].value
      // })


      // createButton(document.getElementsByClassName("player-" + (index+1))[0].value)
    }
    setModalName(false)
    setGameState("word");
  }

  const submitWord = () => {
    // console.log(secretWord);
    setGameState("charactor");
    randomInsider(parseFloat(player));
  };

  const playGames = () => {
    setGameState("playing");
    togglerTimer();
  };

  const randomInsider = (player) => {
    // console.log(player);
    let players = player
    let arr = [];

    let insiderPosition = Math.floor(Math.random() * players) + 1;

    // console.log(secretWord);

    for (let index = 0; index < players; index++) {
      const id = index + 1;
      const randomColor = Math.floor(Math.random() * 16777215).toString(16);

      if (insiderPosition === 10) {
        return insiderPosition - 1;
      }

      if (id === insiderPosition) {
        arr.push({
          id: index + 1,
          char: "Insider",
          color: "#" + randomColor,
          word: secretWord,
          role: "insider",
          name_on_card: "",
          choose: false,
        });
      } else {
        arr.push({
          id: index + 1,
          char: "Common",
          color: "#" + randomColor,
          word: "You have no words, Find the insider.",
          role: "commons",
          name_on_card: "",
          choose: false,
        });
      }
    }

    setCharactor(arr);
    // console.log(arr);
  };

  const flipCard = (e, item) => {
    if (flipingCard === false) {
      var element = document.getElementById("card-" + item.id);
      element.classList.toggle("animation-flip");
      setFlipingCard(true);
    }
  };

  const flipCardFinish = (e, item) => {
    // console.log(item);
    var element = document.getElementById("card-" + item.id);
    element.classList.toggle("animation-flip");
  };

  const closeCard = async (e, item, name) => {
    // document.getElementById("card-" + item.id).style.display = 'none'
    var element = document.getElementById("card-" + item.id);
    element.classList.toggle("animation-flip");
    charactor.find((x) => x.id === item.id).name_on_card = name;
    charactor.find((x) => x.id === item.id).choose = true;
    // setCardStatus(arr)
    setCount(count + 1);
    setFlipingCard(false);
  };

  useEffect(() => {
    // setGameState('playing')

    if (count === (player-1)) {
      setStatus(false);
      // console.log(count);
    }
    // console.log(count);
  }, [count]);

  const showCard = () => {
    setGameState("finished");
  };

  const restart = () => {
    window.location.reload();
  };

  const handleCancel = () => {
    setModalName(false);
  };
  return (
    <div
      style={{ height: "140vh", position: "relative", textAlign: "center" }}
      className="App-header"
    >
      {/* <img
        alt="example"
        src={logo_insider}
        style={{
          width: "300px",
          marginTop: "20px",
          marginBottom: "40px"
          // height: "200px",
          // borderRadius: "5px",
        }}
      /> */}
{/* 
      <Modal title="Create name" open={modalName} onCancel={handleCancel} onOk={submitName}>
        {renderInput(player)}
      </Modal> */}

      {alert && (
        <Alert
          message="Are you f*cking stupid ???"
          description="Please read and fill in again."
          type="error"
          showIcon
          closable
          afterClose={() => setAlert(false)}
          style={{
            width: 400,
            position: 'absolute',
            top: "20%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        />
      )}

      <div
        style={{
          // width: 600,
          // position: "absolute",
          // top: "50%",
          // left: "50%",
          // transform: "translate(-50%, -50%)",
          textAlign: "center",
        }}
      >
        {gameState === "waiting" && (
          <div style={{paddingTop: "200px",}}>
            <p style={{ textAlign: "center", marginBottom: "20px" }}>
              Enter 2-10 players, not counting yourself (ไม่รวม Host)
              {/* Enter 2-10 players */}
            </p>
            {/* <input
        type="number"
        value={player}
        onChange={(e) => setPlayer(e.target.value)}
        placeholder="กรอกจำนวนผู้เล่น ไม่รวม Host"
      /> */}
        <div>
        <Input
              placeholder="1-10"
              size="large"
              onChange={onChangePlayer}
              style={{ marginBottom: "20px", textAlign: "center" , width: "200px" }}
            />
        </div>
            
          
            <Button type="primary" onClick={submitPlayer}>
              OK
            </Button>
          </div>
        )}

        {gameState === "word" && (
          <div style={{paddingTop: "200px",}}>
            <p style={{ textAlign: "center", marginBottom: "20px" }}>
              Put the words, don't let anyone see them.
            </p>
            <div>
            <Input
              placeholder="Secret Word"
              size="large"
              onChange={(e) => setSecretWord(e.target.value)}
              style={{ marginBottom: "20px", textAlign: "center", width: "200px" }}
            />
            </div>
            
            <Button type="primary" onClick={submitWord}>
              OK
            </Button>

            

          </div>
        )}

        {gameState === "charactor" && (
          <div 
          style={{
            width: 600,
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            textAlign: "center",
          }}>
            <Row gutter={[16, 24]}>
              {charactor.map((item) => (
                <Col className="gutter-row" span={6} key={item.id}>
                  <div className="flip-card">
                    <div className="flip-card-inner" id={"card-" + item.id}>
                      {!item.choose ? (
                        // card available
                        <Card
                          onClick={(e) => flipCard(e, item)}
                          className="flip-card-front"
                          hoverable
                          style={{
                            width: "100%",
                            height: "200px",
                          }}
                        >
                          <img
                            alt="example"
                            src={bg}
                            style={{ width: "100%", borderRadius: "5px" }}
                          />
                        </Card>
                      ) : (
                        // card choosed
                        <Card
                          className="flip-card-front"
                          hoverable
                          style={{
                            width: "100%",
                            height: "200px",
                          }}
                        >
                          <img
                            alt="example"
                            src={bg}
                            style={{
                              width: "100%",
                              borderRadius: "5px",
                              filter: "blur(3px)",
                            }}
                          />

                          <span className="position-center">
                            {/* <p style={{fontSize: "18px", fontWeight: 600, color: "#ffffff"}}>{item.id}</p> */}
                            <p
                              style={{
                                fontSize: "20px",
                                fontWeight: 600,
                                color: "black",
                                width: "120px",
                              }}
                            >
                              <p
                                style={{
                                  // backgroundColor: "rgba(255,255,255, 0.8)",
                                  // padding: "2px",
                                  color: "#fff",
                                }}
                              >
                                {item.name_on_card}
                              </p>
                            </p>
                          </span>
                        </Card>
                      )}

                      {item.role === "commons" ? (
                        <>
                          <Card
                            className="flip-card-back"
                            hoverable
                            style={{
                              width: "100%",
                              height: "200px",
                              backgroundColor: "#000"
                            }}
                            // cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
                          >
                            {/* <Meta title={item.word} /> */}
                            <div className="" style={{marginTop: "20px"}}>

                              <QuestionOutlined style={{ fontSize: '50px', color: '#fff', marginBottom: "5px", }} />
                              <p
                                style={{
                                  fontSize: "16px",
                                  fontWeight: 600,
                                  color: "#fff",
                                  marginTop: "0",
                                  marginBottom: "0",
                                  // width: "120px",
                                }}
                              >
                                คนทั่วไป
                              </p>
                              <p
                                style={{
                                  fontSize: "10px",
                                  fontWeight: 600,
                                  color: "#fff",
                                  marginTop: "0",
                                  marginBottom: "0",
                                  // width: "120px",
                                }}
                              >
                                COMMONS
                              </p>
                              <Input
                                placeholder="Name"
                                size="small"
                                onChange={(e) => setNameOnCard(e.target.value)}
                                style={{
                                  width: "90%",
                                  marginTop: "10px",
                                  marginBottom: "5px",
                                  textAlign: "center",
                                }}
                              />
                              <Button
                                type="primary"
                                onClick={(e) => closeCard(e, item, nameOnCard)}
                                danger
                              >
                                OK
                              </Button>
                            </div>
                          </Card>
                        </>
                      ) : (
                        <>
                          <Card
                            className="flip-card-back"
                            hoverable
                            style={{
                              width: "100%",
                              height: "200px",
                              backgroundColor: "#000"
                            }}

                            // cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
                          >
                            {/* <Meta title={item.word} /> */}
                            {/* <img alt="example" src={bg_insider} style={{width: "100%", height: "200px", borderRadius: "5px"}}/> */}

                            <div className="" style={{marginTop: "10px"}}>

                              <EyeFilled style={{ fontSize: '45px', color: '#fff', marginBottom: "5px" }} />
                              <p
                                style={{
                                  fontSize: "16px",
                                  fontWeight: 600,
                                  color: "#fff",
                                  marginTop: "0",
                                  marginBottom: "0",
                                  // width: "120px",
                                }}
                              >
                                จอมบงการ
                              </p>
                              <p
                                style={{
                                  fontSize: "10px",
                                  fontWeight: 600,
                                  color: "#fff",
                                  marginTop: "0",
                                  marginBottom: "0",
                                  // width: "120px",
                                }}
                              >
                                INSIDER
                              </p>
                              <p
                                style={{
                                  fontSize: "12px",
                                  fontWeight: 600,
                                  color: "red",
                                  marginTop: "0",
                                  marginBottom: "0",
                                  // width: "120px",
                                }}
                              >
                                "{secretWord}"
                              </p>
                              <Input
                                placeholder="Name"
                                size="small"
                                onChange={(e) => setNameOnCard(e.target.value)}
                                style={{
                                  width: "90%",
                                  marginTop: "5px",
                                  marginBottom: "5px",
                                  textAlign: "center",
                                }}
                              />
                              <Button
                                type="primary"
                                onClick={(e) => closeCard(e, item, nameOnCard)}
                                danger
                              >
                                OK
                              </Button>
                            </div>

                            {/* <span className="position-center">
                              <p
                                style={{
                                  fontSize: "16px",
                                  fontWeight: 600,
                                  color: "#000000",
                                  marginBottom: "20px",
                                  width: "120px",
                                }}
                              >
                                You are insider!! The word is :{" "}
                                <p
                                  style={{
                                    backgroundColor: "rgba(255,0,0, 0.8)",
                                    padding: "2px",
                                    color: "#ffffff",
                                  }}
                                >
                                  {item.word}
                                </p>
                              </p>
                              <Input
                                placeholder="Name"
                                size="small"
                                onChange={(e) => setNameOnCard(e.target.value)}
                                style={{
                                  marginBottom: "20px",
                                  textAlign: "center",
                                }}
                              />
                              <Button
                                type="primary"
                                onClick={(e) => closeCard(e, item, nameOnCard)}
                              >
                                OK
                              </Button>
                            </span> */}
                          </Card>
                        </>
                      )}
                    </div>
                  </div>
                </Col>
              ))}
            </Row>

            <Button
              type="primary"
              onClick={playGames}
              disabled={status}
              style={{ marginTop: "50px" }}
            >
              Play
            </Button>
          </div>
        )}

        {gameState === "playing" && (
          <div
          style={{
            width: 600,
            position: "absolute",
            top: "40%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            textAlign: "center",
          }}>
            {timeOver ? (
              <div>
                <span style={{ fontSize: "40px", fontWeight: 700 }}>
                  Time's up.
                </span>
              </div>
            ) : (
              <div>
                <span style={{ fontSize: "40px", fontWeight: 700 }}>
                  CountDown : {minutes}:{seconds}
                </span>
              </div>
            )}

            {/* <Button type="primary" onClick={togglerTimer} style={{ marginTop: "50px" }}>
                Start time
              </Button>  */}

            <Button
              type="primary"
              onClick={showCard}
              style={{ marginTop: "50px" }}
            >
              Show Card
            </Button>
          </div>
        )}

        {gameState === "finished" && (
          <div
          style={{
            width: 600,
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            textAlign: "center",
          }}>
            <Row gutter={[16, 24]}>
              {charactor.map((item) => (
                <Col className="gutter-row" span={6} key={item.id}>
                  <div className="flip-card">
                    <div className="flip-card-inner" id={"card-" + item.id}>
                      <Card
                        onClick={(e) => flipCardFinish(e, item)}
                        className="flip-card-front"
                        hoverable
                        style={{
                          width: "100%",
                          height: "200px",
                          backgroundImage: `url(../img/card.png)`,
                          backgroundPosition: "center",
                          backgroundSize: "cover",
                        }}
                      >
                        {/* <Meta title={item.word} /> */}
                        <img
                          alt="example"
                          src={bg}
                          style={{
                            width: "100%",
                            height: "200px",
                            borderRadius: "5px",
                          }}
                        />
                        <span className="position-center">
                          {/* <p style={{fontSize: "18px", fontWeight: 600, color: "#ffffff"}}>{item.id}</p> */}
                          <p
                            style={{
                              fontSize: "20px",
                              fontWeight: 600,
                              color: "black",
                              width: "120px",
                            }}
                          >
                            <p
                              style={{
                                backgroundColor: "rgba(255,255,255, 0.8)",
                                padding: "2px",
                                color: "#000",
                              }}
                            >
                              {item.name_on_card}
                            </p>
                          </p>
                        </span>

                        {/* <Button type="primary" onClick={(e) => closeCard(e, item)}>ปิด</Button> */}
                      </Card>

                      {item.role === "commons" ? (
                        <>
                          <Card
                            className="flip-card-back"
                            hoverable
                            style={{
                              width: "100%",
                              height: "200px",
                              backgroundColor: "#000"
                            }}
                            // cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
                          >
                            {/* <Meta title={item.word} /> */}
                            <div className="" style={{marginTop: "20px"}}>

                              <QuestionOutlined style={{ fontSize: '50px', color: '#fff', marginBottom: "5px", }} />
                              <p
                                style={{
                                  fontSize: "16px",
                                  fontWeight: 600,
                                  color: "#fff",
                                  marginTop: "0",
                                  marginBottom: "0",
                                  // width: "120px",
                                }}
                              >
                                คนทั่วไป
                              </p>
                              <p
                                style={{
                                  fontSize: "10px",
                                  fontWeight: 600,
                                  color: "#fff",
                                  marginTop: "0",
                                  marginBottom: "0",
                                  // width: "120px",
                                }}
                              >
                                COMMONS
                              </p>
                            </div>
                          </Card>
                        </>
                      ) : (
                        <>
                          <Card
                            className="flip-card-back"
                            hoverable
                            style={{
                              width: "100%",
                              height: "200px",
                              backgroundColor: "#000"
                            }}

                            // cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
                          >
                            {/* <Meta title={item.word} /> */}
                            {/* <img alt="example" src={bg_insider} style={{width: "100%", height: "200px", borderRadius: "5px"}}/> */}

                            <div className="" style={{marginTop: "10px"}}>

                              <EyeFilled style={{ fontSize: '45px', color: '#fff', marginBottom: "5px" }} />
                              <p
                                style={{
                                  fontSize: "16px",
                                  fontWeight: 600,
                                  color: "#fff",
                                  marginTop: "0",
                                  marginBottom: "0",
                                  // width: "120px",
                                }}
                              >
                                จอมบงการ
                              </p>
                              <p
                                style={{
                                  fontSize: "10px",
                                  fontWeight: 600,
                                  color: "#fff",
                                  marginTop: "0",
                                  marginBottom: "0",
                                  // width: "120px",
                                }}
                              >
                                INSIDER
                              </p>
                              <p
                                style={{
                                  fontSize: "16px",
                                  fontWeight: 600,
                                  color: "red",
                                  marginTop: "0",
                                  marginBottom: "0",
                                  // width: "120px",
                                }}
                              >
                                "{secretWord}"
                              </p>
                            </div>

                            {/* <span className="position-center">
                              <p
                                style={{
                                  fontSize: "16px",
                                  fontWeight: 600,
                                  color: "#000000",
                                  marginBottom: "20px",
                                  width: "120px",
                                }}
                              >
                                You are insider!! The word is :{" "}
                                <p
                                  style={{
                                    backgroundColor: "rgba(255,0,0, 0.8)",
                                    padding: "2px",
                                    color: "#ffffff",
                                  }}
                                >
                                  {item.word}
                                </p>
                              </p>
                              <Input
                                placeholder="Name"
                                size="small"
                                onChange={(e) => setNameOnCard(e.target.value)}
                                style={{
                                  marginBottom: "20px",
                                  textAlign: "center",
                                }}
                              />
                              <Button
                                type="primary"
                                onClick={(e) => closeCard(e, item, nameOnCard)}
                              >
                                OK
                              </Button>
                            </span> */}
                          </Card>
                        </>
                      )}
                    </div>
                  </div>
                </Col>
              ))}
            </Row>

            <Button
              type="primary"
              onClick={restart}
              style={{ marginTop: "50px" }}
            >
              Restart
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
