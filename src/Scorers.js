import React from "react";
import axios from "axios";

const INITIALIZING_COUNTERS=0;

class Scorers extends React.Component{

    state={
        propsId:"none",
        scorers: [],
    }


    allScorers= (props)=> {
        debugger
        if (props.ligId !== INITIALIZING_COUNTERS) {
            axios.get('https://app.seker.live/fm1/history/' + props.ligId)
                .then((response) => {
                    response.data.map((object => {
                        object.goals.map((goals => {
                            this.state.scorers.push(goals.scorer.firstName + " " + goals.scorer.lastName)
                        }))
                    }))

                    this.setState({
                        propsId: props.ligId,
                            dis:true
                    })
                })

        }
    }

    findBiggestScorer = ()=>{
        let current=INITIALIZING_COUNTERS
        let biggest=INITIALIZING_COUNTERS
        let second=INITIALIZING_COUNTERS
        let three=INITIALIZING_COUNTERS
        let biggestName= ""
        let secondName= ""
        let threeName= ""


        debugger
        for (let i=0;i<this.state.scorers.length;i++){
            for (let j=i;j<this.state.scorers.length;j++){
                if (this.state.scorers[i]===this.state.scorers[j]){
                    current++
                }
            }
            if (current >= biggest){
                second=biggest
                three=second
                threeName=secondName
                secondName=biggestName
                biggest=current
                biggestName=this.state.scorers[i]
            }
            else if (current>=second && current<biggest && this.state.scorers[i].localeCompare(biggestName)){
                second=current
                three=second
                threeName=secondName
                secondName=this.state.scorers[i]
            }
            else if (current>=three && current<second && this.state.scorers[i].localeCompare(biggestName) && this.state.scorers[i].localeCompare(secondName)){
                three=current
                threeName=this.state.scorers[i]
            }
            current=0;
        }
        let result= "------ biggest scorer: "+biggestName+" - "+ biggest+" goals \n -------    second biggest scorer: "+secondName+" - "+ second+" goals ----- \n  ----  third biggest scorer: "+threeName+" - "+ three+" goals -----"
        return(result)
    }

    render() {
        return(
    <div>
        Scorers:
        <br/>
        {
            <button disabled={this.state.dis} onClick={(() => {
                this.allScorers(this.props)})}> Submit </button>
        }
        {
            <div style={{color:"gold",fontSize:"30px"}}>
                {this.findBiggestScorer()}
            </div>
        }

        {
           this.state.scorers.map((scorer) => {
                return(
            <table>
                All Scorers:
                <tr>
                    <td>
                        {scorer}
                    </td>
                </tr>
            </table>
                )

            })

        }
    </div>
        )
    }
    }
    export default Scorers;
