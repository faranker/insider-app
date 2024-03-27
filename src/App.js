import logo from './logo.svg';
import { useState, useEffect } from 'react'
import { Button, InputNumber, Input, Card, Alert, Space, Col, Divider, Row, notification } from 'antd';
import './App.css';

function App() {
  const { Meta } = Card;
  const [count, setCount] = useState(0)
  const [secretWord, setSecretWord] = useState('');
  const [nameOnCard, setNameOnCard] = useState('');
  const [playerGuess, setPlayerGuess] = useState('');
  const [insiderHint, setInsiderHint] = useState('');
  const [player, setPlayer] = useState('');
  const [charactor, setCharactor] = useState([]);
  const [gameState, setGameState] = useState('waiting'); // Can be 'waiting', 'playing', 'finished'

  const [alert, setAlert] = useState(false);
  const [timeOver, setTimeOver] = useState(false);
  const [countDown, setCountDown] = useState(0);
  const [runTimer, setRunTimer] = useState(false);

  const togglerTimer = () => setRunTimer((t) => !t);

  const seconds = String(countDown % 60).padStart(2, 0);
  const minutes = String(Math.floor(countDown / 60)).padStart(2, 0);

  useEffect(() => {
    let timerId;

    if (runTimer) {
      setCountDown(2);
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

      setTimeOver(true)
      setRunTimer(false);
      setCountDown(0);
    }
  }, [countDown, runTimer]);

  const style = {
    background: '#0092ff',
    padding: '8px 0',
  };


  const submitPlayer = () => {
    let players = parseFloat(player)

    if (players < 10) {
      setGameState('word')
    } else {
      setAlert(true)
    }
  };

  const submitWord = () => {
    // console.log(secretWord);
    setGameState('charactor')
    randomInsider(parseFloat(player))
  };

  const playGames = () => {
    setGameState('playing')
    // togglerTimer()
  }

  const randomInsider = (player) => {
    // console.log(player);
    let arr = []

    let insiderPosition = Math.floor(Math.random() * player) + 1

    console.log(secretWord);

    for (let index = 0; index < player; index++) {
      const id = index + 1;
      const randomColor = Math.floor(Math.random() * 16777215).toString(16);

      if (insiderPosition === 10) {
        return insiderPosition - 1
      }

      if (id === insiderPosition) {
        arr.push({
          id: index + 1,
          char: 'Insider',
          color: '#' + randomColor,
          word: 'You are insider!! The word is : ' + '``' + secretWord + '``',
          name_on_card: ''
        })
      } else {
        arr.push({
          id: index + 1,
          char: 'Common',
          color: '#' + randomColor,
          word: 'You have no words, Find the insider.',
          name_on_card: ''
        })
      }

    }

    setCharactor(arr)
    // console.log(arr);
  }

  const flipCard = (e, item) => {
    // console.log(item);
    var element = document.getElementById("card-" + item.id);
    element.classList.toggle("animation-flip");
  }

  const closeCard = async (e, item, name) => {
    document.getElementById("card-" + item.id).style.display = 'none'
    charactor.find(x => x.id === item.id).name_on_card = name

    setCount(count + 1)
  }

  useEffect(() => {
    // setGameState('playing')

    if (count === parseFloat(player)) {
      setGameState('playing')
    }
    console.log(count);
  }, [count]);

  const showCard = () => {
    setGameState('finished')
  }

  const restart = () => {
    window.location.reload()
  }
  return (
    <div style={{ height: "100vh", position: "relative" }} className='App-header'>

      {alert && (
        <Alert
          message="Are you f*cking stupid ???"
          description="Please read and fill in again."
          type="error"
          showIcon
          closable
          afterClose={() => setAlert(false)}
          style={{ width: 400, top: "20%", left: "50%", transform: "translate(-50%, -50%)" }}
        />
      )}


      <div style={{
        width: 600,
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        textAlign: "center"
      }}>


        {gameState === 'waiting' && (
          <div>
            <p style={{ textAlign: "center", marginBottom: "20px" }}>Enter 2-10 players, not counting yourself (ไม่รวม Host)</p>
            {/* <input
        type="number"
        value={player}
        onChange={(e) => setPlayer(e.target.value)}
        placeholder="กรอกจำนวนผู้เล่น ไม่รวม Host"
      /> */}
            <Input placeholder='1-10' size="large" onChange={(e) => setPlayer(e.target.value)} style={{ marginBottom: "20px", textAlign: "center" }} />
            <Button type="primary" onClick={submitPlayer}>OK</Button>
          </div>

        )}

        {gameState === 'word' && (
          <div>
            <p style={{ textAlign: "center", marginBottom: "20px" }}>Put the words, don't let anyone see them.</p>
            <Input placeholder='Secret Word' size="large" onChange={(e) => setSecretWord(e.target.value)} style={{ marginBottom: "20px", textAlign: "center" }} />
            <Button type="primary" onClick={submitWord}>OK</Button>
          </div>
        )}

        {gameState === 'charactor' && (
          <div>
            <Row gutter={[16, 24]}>
              {charactor.map((item) =>
                <Col className="gutter-row" span={6} key={item.id} >
                  <div className='flip-card'>
                    <div className='flip-card-inner' id={'card-' + item.id}>
                      <Card
                        onClick={(e) => flipCard(e, item)}
                        className='flip-card-front'
                        hoverable
                        style={{
                          width: "100%",
                          height: "200px",
                          backgroundImage: `url(/img/card.png)`,
                          backgroundPosition: "center",
                          backgroundSize: "cover"
                        }}

                      // cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
                      >

                        {/* <Meta title={item.word} /> */}
                        {/* <span className='position-center'>
                        <p style={{fontSize: "18px", fontWeight: 600, color: "#ffffff"}}>{item.id}</p>
                        <p>{item.name_on_card}</p>
                        </span> */}


                        {/* <Button type="primary" onClick={(e) => closeCard(e, item)}>ปิด</Button> */}
                      </Card>

                      {item.word === 'You have no words, Find the insider.' ? (
                        <>
                          <Card
                            className='flip-card-back'
                            hoverable
                            style={{
                              width: "100%",
                              height: "200px",
                            }}


                          // cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
                          >
                            {/* <Meta title={item.word} /> */}
                            <span className='position-center'>
                              <p style={{ fontSize: "14px", fontWeight: 600, color: "black", marginBottom: "20px" }}>{item.word}</p>
                              <Input placeholder='Name' size="small" onChange={(e) => setNameOnCard(e.target.value)} style={{ marginBottom: "20px", textAlign: "center" }} />
                              <Button type="primary" onClick={(e) => closeCard(e, item, nameOnCard)}>OK</Button>
                            </span>

                          </Card>
                        </>
                      ) : (
                        <>
                          <Card
                            className='flip-card-back'
                            hoverable
                            style={{
                              width: "100%",
                              height: "200px",
                              backgroundImage: `url(/img/insider.jpg)`,
                              backgroundPosition: "center",
                              backgroundSize: "cover"
                            }}


                          // cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
                          >
                            {/* <Meta title={item.word} /> */}
                            <span className='position-center'>
                              <p style={{ fontSize: "14px", fontWeight: 600, color: "#ffffff", marginBottom: "20px" }}>{item.word}</p>
                              <Input placeholder='Name' size="small" onChange={(e) => setNameOnCard(e.target.value)} style={{ marginBottom: "20px", textAlign: "center" }} />
                              <Button type="primary" onClick={(e) => closeCard(e, item, nameOnCard)}>OK</Button>
                            </span>


                          </Card>
                        </>
                      )}


                    </div>
                  </div>

                </Col>
              )}

            </Row>

            <Button type="primary" onClick={playGames} style={{ marginTop: "50px" }}>Play</Button>
          </div>
        )}

        {gameState === 'playing' && (
          <div>
            {timeOver ? (
              <div>
                <span style={{ fontSize: "40px", fontWeight: 700 }}>Time's up.</span>
              </div>
            ) : (
              <div>
                <span style={{ fontSize: "40px", fontWeight: 700 }}>CountDown : {minutes}:{seconds}</span>
              </div>
            )}


            {timeOver ? (
              <Button type="primary" onClick={showCard} style={{ marginTop: "50px" }}>
                Show Card
              </Button>
            ) : (

              <Button type="primary" onClick={togglerTimer} style={{ marginTop: "50px" }}>
                Start time
              </Button>
            )}




          </div>
        )}

        {gameState === 'finished' && (
          <div>
            <Row gutter={[16, 24]}>
              {charactor.map((item) =>
                <Col className="gutter-row" span={6} key={item.id} >
                  <div className='flip-card'>
                    <div className='flip-card-inner' id={'card-' + item.id}>
                      <Card
                        onClick={(e) => flipCard(e, item)}
                        className='flip-card-front'
                        hoverable
                        style={{
                          width: "100%",
                          height: "200px",
                          backgroundImage: `url(/img/card.png)`,
                          backgroundPosition: "center",
                          backgroundSize: "cover",
                        }}
                      // cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
                      >
                        {/* <Meta title={item.word} /> */}
                        <span className='position-center'>
                          {/* <p style={{fontSize: "18px", fontWeight: 600, color: "#ffffff"}}>{item.id}</p> */}
                          <p style={{ fontSize: "20px", fontWeight: 600, color: "black" }}>{item.name_on_card}</p>
                        </span>


                        {/* <Button type="primary" onClick={(e) => closeCard(e, item)}>ปิด</Button> */}
                      </Card>

                      {item.word === 'You have no words, Find the insider.' ? (
                        <>
                          <Card
                            className='flip-card-back'
                            hoverable
                            style={{
                              width: "100%",
                              height: "200px",
                            }}


                          // cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
                          >
                            {/* <Meta title={item.word} /> */}
                            <span className='position-center'>
                              <p style={{ fontSize: "16px", fontWeight: 600, color: "black" }}>{item.word}</p>
                            </span>

                          </Card>
                        </>
                      ) : (
                        <>
                          <Card
                            className='flip-card-back'
                            hoverable
                            style={{
                              width: "100%",
                              height: "200px",
                              backgroundImage: `url(/img/insider.jpg)`,
                              backgroundPosition: "center",
                              backgroundSize: "cover"
                            }}


                          // cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
                          >
                            {/* <Meta title={item.word} /> */}
                            <span className='position-center'>
                              <p style={{ fontSize: "16px", fontWeight: 600, color: "#ffffff" }}>{item.word}</p>
                            </span>

                          </Card>
                        </>
                      )}


                    </div>
                  </div>

                </Col>
              )}

            </Row>

            <Button type="primary" onClick={restart} style={{ marginTop: "50px" }}>Restart</Button>
          </div>
        )}
      </div>



    </div>
  );
}

export default App;
