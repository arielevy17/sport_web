import React from "react";
import axios from "axios";
class ResultHistory extends React.Component{
        state={
            results:[],
            propsId:"none",
            minRound:null,
            helpMaxRound:null,
            maxRound:null,
            roundsNumbers:[]
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
                .then((response) =>{
                    let homeCounter=0;
                    let awayCounter=0;
                    let currentResults = this.state.results
                    for (let i=0;i<response.data.length;i++){
                        response.data[i].goals.map((goal) =>{
                            goal.home?
                                homeCounter++ : awayCounter++
                        })
                        currentResults[i]= response.data[i].homeTeam.name+" - "+homeCounter+"               "
                            +response.data[i].awayTeam.name+" - "+awayCounter;
                        homeCounter=0;
                        awayCounter=0;
                    }
                    this.setState({
                        results : currentResults,
                        propsId: props.ligId,
                        helpMaxRound : response.data[response.data.length-1].round,
                    })
                    let currencyRoundsNumbers=this.state.roundsNumbers
                    for (let i=1; i<=this.state.helpMaxRound; i++) {
                    currencyRoundsNumbers[i]=i;
                    }
                        this.setState({
                            roundsNumbers : currencyRoundsNumbers
                        })
                })
        }

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