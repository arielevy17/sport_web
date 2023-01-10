import React from "react";
import axios from "axios";

const INITIALIZING_COUNTERS=0;

class ResultHistory extends React.Component{
        state={
            results:[],
            propsId:"none",
            minRound:null,
            helpMaxRound:null,
            maxRound:null,
            roundsNumbers:[],
            errorRange:false
        }

    currencyMinChange = (event) => {
        this.setState({
            minRound : event.target.value,
        })
    }

    currencyMaxChange = (event) => {
        this.setState({
            maxRound : event.target.value,
        })
    }


        showGamesResult= (props)=> {
            debugger
            axios.get('https://app.seker.live/fm1/history/'+props.ligId)
                .then((response) => {
                    let homeCounter = INITIALIZING_COUNTERS;
                    let awayCounter = INITIALIZING_COUNTERS;
                    let currentResults = this.state.results
                    for (let i = 0; i < response.data.length; i++) {
                        if (this.state.minRound > this.state.maxRound) {
                            this.setState({
                                errorRange:true
                            })

                        }
                        else {
                            this.setState({
                                errorRange:false
                            })
                            if (response.data[i].round >= this.state.minRound && response.data[i].round <= this.state.maxRound) {
                                response.data[i].goals.map((goalInRange) => {
                                    goalInRange.home ?
                                        homeCounter++ : awayCounter++
                                })
                                currentResults[i] = response.data[i].homeTeam.name + "  " + homeCounter + "       -        " +
                                awayCounter  + "  "  + response.data[i].awayTeam.name
                                homeCounter = 0;
                                awayCounter = 0;
                            }
                        }
                        }
                        this.setState({
                            results: currentResults,
                            propsId: props.ligId,
                        })
                        let currencyRoundsNumbers = this.state.roundsNumbers
                        for (let j = 0; j <= response.data[response.data.length-1].round; j++) {
                            currencyRoundsNumbers[j] = j;
                        }
                        this.setState({
                            roundsNumbers: currencyRoundsNumbers
                        })
                    }
                )}


        render() {
            return(

                <div>
                    <select onClick={this.leagueDosntSelected} value={this.state.minRound} onChange={this.currencyMinChange}>
                        <option disabled={true} value={"none"}> From Round</option>
                        {this.state.roundsNumbers.map((item) => {
                            return (
                                <option value={item}> {item} </option>
                            )
                        })}
                    </select>
                    <select onClick={this.leagueDosntSelected} value={this.state.maxRound} onChange={this.currencyMaxChange}>
                        <option disabled={true} value={"none"}> Too Round</option>
                        {this.state.roundsNumbers.map((item) => {
                            return (
                                <option value={item}> {item} </option>
                            )
                        })}
                    </select>
                    {this.state.errorRange?
                        <label style={{color: "red"}}>
                            <br/>
                            **The max round have to be biger then the min round</label> :
                        null
                    }
                    {
                        this.showGamesResult(this.props)
                    }
                    <table>{
                      this.state.results.map((gameResult) => {
                        return(
                            <tr>
                                <td>
                                    {gameResult}
                                </td>
                          </tr>
                        )
                      })
                    } </table>
                </div>
            )
        }
}
    export default ResultHistory;