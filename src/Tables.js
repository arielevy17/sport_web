import React from "react";
import axios from "axios";

const DIFFERENCE_FROM_ARRAY_INDEX=1;
const MARGIN_SIZE=150;

class Tables extends React.Component{
  state={
     teamsName:[],
     teamsId:[],
     players:[],
      teamResults:[],
      propsId:"none"
}

    showTable = (props) =>{
      debugger;
        axios.get('https://app.seker.live/fm1/teams/'+props.ligId)
            .then((response) => {
                let currentTeamName=this.state.teamsName;
                let currentTeamId=this.state.teamsId;
                let clearList=[];

                for (let i=0;i<response.data.length;i++) {
                    currentTeamName[i] = (response.data[i].name)
                    currentTeamId[i] = (response.data[i].id)
                }

                this.setState({
                    teamsName: currentTeamName,
                    teamsId: currentTeamId,
                    propsId: props.ligId,
                    players:clearList,
                    teamResults:clearList
                })

            })
    }



    getPlayers = (teamId)=> {
            axios.get('https://app.seker.live/fm1/squad/' + this.state.propsId + '/' +teamId )
                .then((response) => {
                    let currentPlayer = this.state.players;
                    for (let i = 0; i < response.data.length; i++) {
                        currentPlayer[i] = (response.data[i].firstName + " " + response.data.lastName)
                    }
                    this.setState({
                        players: currentPlayer,
                        loader: false
                    })
                })
    }

    showTeamResults = (teamId) => {
      debugger
        axios.get('https://app.seker.live/fm1/history/'+this.state.propsId+'/'+teamId)
            .then((response) =>{
                let homeCounter=0;
                let awayCounter=0;
                let indexCounter=0;
                let currentResults = this.state.teamResults
                for (let j=0;j<response.data.length;j++) {
                    response.data[j].goals.map((goal) => {
                        goal.home ?
                            homeCounter++ : awayCounter++
                    })
                    if (response.data[j].homeTeam.id === teamId || response.data[j].awayTeam.id === teamId) {
                        currentResults[indexCounter] = response.data[j].homeTeam.name + " - " + homeCounter + "               "
                            + response.data[j].awayTeam.name + " - " + awayCounter;
                        homeCounter=0;
                        awayCounter=0;
                        indexCounter++;
                    }
                }
                this.setState({
                    teamResults : currentResults
                })
    })
    }


 render() {
      return(
          <div>
              League Table
              {
                  <button onClick= {() => this.showTable(this.props)} >Submit</button>
              }
              <table>
                  {
                      this.state.teamsName.map((team, position) => {
                          return(
                              <tr >
                                  {
                                      <td>
                                          <button // באג-מתרנדר אינסופית + מופיע לפני שנלחצה הקבוצה
                                              onClick={(()=>{this.getPlayers(this.state.teamsId[this.state.teamsName.indexOf(team)]);
                                                  this.showTeamResults(this.state.teamsId[this.state.teamsName.indexOf(team)])}
                                              )}
                                             >
                                              {
                                                  (position + DIFFERENCE_FROM_ARRAY_INDEX) + ". " + team
                                              }
                                          </button>

                                      </td>
                                  }
                              </tr>
                          )
                      })
                  }
              </table>
              <div style={{marginLeft: MARGIN_SIZE, fontWeight: "bold", fontSize: "20px", color: "orange"}}>
                  Team Players:
                  {
                      this.state.players.map((player) => {
                          return (
                              <table>
                                  <tr>
                                      <td>
                                          {
                                               player
                                              }
                                      </td>
                                  </tr>
                              </table>
                          )
                      })
                  }
              </div>
              <div style={{marginLeft: MARGIN_SIZE, fontWeight: "bold", fontSize: "20px", color:"silver"}}>
                  Team Results:
                  {
                      this.state.teamResults.map((gameResult) =>{
                          return (
                              <table>
                                  <tr>
                                      <td>
                                          {
                                              gameResult
                                          }
                                      </td>
                                  </tr>
                              </table>
                          )
                      })
                  }
              </div>
          </div>

      )
}


}
export default Tables;