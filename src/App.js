import React from "react";
import axios from "axios";
import {BrowserRouter,Routes,Route,NavLink} from "react-router-dom";
import Tables from "./Tables";
import Statistic from "./Statistic";
import ResultHistory from "./ResultHistory";
import Scorers from "./Scorers";

const DIFFERENCE_FROM_ARRAY_INDEX=1;


class App extends React.Component {
    state = {
        leagues: [],
        currency: "none",
        loader: true,
        disableButton: true,
        hideSelectBox:false
    }

    componentDidMount() {
        this.showLeagues()
    }

    currencyChange = (event) => {
        this.setState({
            currency: event.target.value,
        })
    }

    leagueWasSelected = () =>{
        if (this.state.currency !== "none" ){
            this.setState({
                disableButton: false
            })
         //   alert("you must select the action you wont,\n and after this select a different league!")
        }
    }



    showLeagues = () => {
        axios.get('https://app.seker.live/fm1/leagues/')
            .then((response) => {
                let currentLeague = this.state.leagues;
                for (let i = 0; i < response.data.length; i++) {
                    currentLeague[i] = (response.data[i].name)
                }
                this.setState({
                    leagues: currentLeague,
                    loader: false
                })
            });
    }

    render() {
        return (
            <div className={"App"}>
                { //  באג ברינדור של הליגה מתוך העמוד לכן אני לא מאפשר לרנדר מתוך העמוד אלה רק כניסה מחודשת לעמוד (פוגם ב- single page aplication)
                    this.state.loader ? // ממתין עד שהמידע מהשרת מגיע
                        <div> please wait... </div>
                        :
                        <div>
                            <div style={{fontWeight: "bold", fontSize: "40px", color: "gold"}}> Sport Waow </div>
                            <div style={{fontWeight: "bold", fontSize: "20px", color:"chartreuse"}}>Choose Your Action </div>

                            <a  href={"/tables"}> Tables</a>
                            <br/>
                            <a   href={"/statistic"}> Statistic</a>
                            <br/>
                            <a  href={"/result-history"}> Result-History</a>
                            <br/>
                            <a  href={"/scorers"}> Scorers</a>
                            <BrowserRouter>
                                <Routes>
                                    <Route path={"/tables"} element={<Tables
                                        ligId={this.state.leagues.indexOf(this.state.currency) + DIFFERENCE_FROM_ARRAY_INDEX}/>}/>
                                    <Route path={"/statistic"} element={<Statistic/>}/>
                                    <Route path={"/result-history"} element={<ResultHistory
                                        ligId={this.state.leagues.indexOf(this.state.currency) + DIFFERENCE_FROM_ARRAY_INDEX}/>}/>
                                    <Route path={"/scorers"} element={<Scorers
                                        ligId={this.state.leagues.indexOf(this.state.currency) + DIFFERENCE_FROM_ARRAY_INDEX}/>}/>
                                </Routes>
                            </BrowserRouter>
                            {
                                // מעלים את תיבת בחירת הליגה לאחר בחירת ליגה בגלל הבאג ברינדטר הליגה
                                    <div>
                                        <label> Select your league </label>
                                        <br/>
                                        <select onClick={this.leagueWasSelected} value={this.state.currency} onChange={this.currencyChange}>
                                            <option disabled={true} value={"none"}> Press Your League</option>
                                            {
                                                this.state.leagues.map((item) => {
                                                return (
                                                    <option value={item}> {item} </option>
                                                )
                                            })}
                                        </select>
                                    </div>

                            }

                        </div>
                }
            </div>
        )
    }
}

export default App;
