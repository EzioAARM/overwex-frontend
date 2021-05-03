import React, { Component } from "react";
import playstation_logo from '../assets/playstation.png'
import origin_logo from '../assets/origin.png'
import xbox_logo from '../assets/xbox.png'
import octane_face from '../assets/octane_face.jpg'
import 'zingchart/es6';
import ZingChart from 'zingchart-react';
import { globals } from "../globals";

class ApexUser extends Component {
    
    constructor(props) {
        super(props)
        this.state = {
            obtuvoData: false,
            legendsActive: true,
            rankItemsDisplay: 10
        }
        fetch(globals.GRAPH_API, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                query: `
                    query {
                        ApexUserProfile (username: "${this.props.user}", platform: "${this.props.platform}") {
                            username,
                            platform,
                            imageUrl,
                            kills,
                            level,
                            legends {
                                name,
                                imageUrl,
                                tallImageUrl,
                                bgImageUrl,
                                kills,
                                isSelected
                            },
                            rankHistory {
                                rankName,
                                rankValue,
                                rankIconUrl,
                                fechaRegistrado,
                                fechaUnix
                            }
                        }
                    }
                `
            })
        }).then(res => res.json())
        .then(res => {
            this.setState({
                realizoBusqueda: true,
                userInfo: res.data.ApexUserProfile
            })
        })
        .catch(error => console.log(error))
        .finally(() => {
            this.setState({
                obtuvoData: true
            })
        })
        this.renderRankedGraph = this.renderRankedGraph.bind(this)
    }

    renderLegends() {
        return this.state.userInfo.legends.map((item, index) => {
            if (item.kills) 
                return (
                    <div className='column is-3' key={index}>
                        <div className='columns'>
                            <div className='column is-12'>
                                <img src={item.imageUrl} alt='UserImage' />
                            </div>
                        </div>
                        <div className='columns is-multiline is-centered'>
                            <div className='column p-0 is-12 is-size-4 has-text-centered'>
                                <strong>
                                    {item.kills}
                                </strong>
                            </div>
                            <div className='column p-0 is-12 is-size-4 has-text-centered'>
                                Eliminaciones
                            </div>
                        </div>
                    </div>
                )
            return null
        })
    }

    renderRankedGraph() {
        let rankedGroupedData = []
        let rankMinValue = 1000000000
        let rankMaxValue = -1000000000
        for (let i = 0; i < this.state.userInfo.rankHistory.length; i++) {
            rankMinValue = rankMinValue >= this.state.userInfo.rankHistory[i].rankValue ? this.state.userInfo.rankHistory[i].rankValue : rankMinValue
            rankMaxValue = rankMaxValue <= this.state.userInfo.rankHistory[i].rankValue ? this.state.userInfo.rankHistory[i].rankValue : rankMaxValue
            if (i === 0)
                rankedGroupedData.push(this.state.userInfo.rankHistory[i])
            else {
                if (rankedGroupedData[rankedGroupedData.length - 1].rankValue !== this.state.userInfo.rankHistory[i].rankValue)
                    rankedGroupedData.push(this.state.userInfo.rankHistory[i])
            }
        }
        let rankedData = rankedGroupedData.slice(0, this.state.rankItemsDisplay)
        let listadoValores = []
        let listadoFechas = []
        rankedData.forEach(item => {
            listadoValores.push(item.rankValue)
            listadoFechas.push(item.fechaRegistrado)
        })
        let rank_history_graph = {
            type: 'line',
            title: {
                text: "Historial de nivel en rankeds",
                'font-color': "#1d1d1d",
                "font-family": "teko"
            },
            plot: {
                aspect: 'spline',
                tooltip: {
                    text: "X: %kt<br>Y: %vt",
                    'text-align': "center",
                    'font-color': "#1d1d1d",
                    "font-family": "teko",
                    'font-size': 20,
                    'background-color': "#eeeeee",
                    'border-width': 1,
                    'border-color': "gray",
                    'border-radius': "7px",
                    alpha:0.5,
                    padding: "7%"
                }
            },
            plotarea: {
                'margin-left': "dynamic",
                'margin-bottom': "dynamic"
            },
            'scale-x': {
                values: listadoFechas,
                'max-items': 10
            },
            'scale-y': {
                values: `${rankMinValue - 100}:${rankMaxValue + 100}:${(rankMinValue-rankMaxValue)/10}`
            },
            series: [{
                values: listadoValores
            }]
        }
        return (
        <div className='columns'>
            <div className='column is-full'>
                <ZingChart data={rank_history_graph} />
            </div>
        </div>)
    }

    render() {
        return (
            <div className='column is-8 mt-6'>
                <div className='columns is-mobile is-centered'>
                    <div className='column is-narrow'>
                        <figure className={this.state.obtuvoData ? "image is-128x128" : "image is-128x128 element is-loading"}>
                            {
                                this.state.obtuvoData ? 
                                    <img className='is-rounded' src={this.state.userInfo.imageUrl} alt={this.props.user} /> : 
                                    <img className='is-rounded' src={octane_face} alt={this.props.user} />
                            }
                        </figure>
                    </div>
                </div>
                <div className='columns is-mobile is-centered mb-1'>
                    <div className='column is-narrow pb-0'>
                        <h4 className='title is-4'>{this.props.user}</h4>
                    </div>
                </div>
                <div className='columns is-mobile is-centered'>
                    <div className='column is-narrow'>
                        {
                            this.props.platform === 'psn' ? 
                                (<figure className='image is-32x32'>
                                    <img src={playstation_logo} alt="Playstation" />
                                </figure>) : 
                            this.props.platform === 'xbl' ? 
                                (<figure className='image is-16x16'>
                                    <img src={xbox_logo} alt="Xbox" />
                                </figure>) : 
                                (<figure className='image is-16x16'>
                                    <img src={origin_logo} alt="Origin" />
                                </figure>)
                        }
                    </div>
                    <div className='column is-narrow'>
                        {
                            this.state.obtuvoData ? (
                                <strong>{"lvl " + (this.state.userInfo.level > 500 ? "500" : this.state.userInfo.level)}</strong>
                            ) : "Loading..."
                        }
                    </div>
                </div>
                <div className='columns'>
                    <div className='column is-full'>
                        <div className='tabs is-centered'>
                            <ul>
                                <li className={this.state.legendsActive ? 'is-active' : ""}>
                                    <a onClick={() => this.setState({
                                        legendsActive: true
                                    })}>Leyendas</a>
                                </li>
                                <li className={!this.state.legendsActive ? 'is-active' : ""}>
                                    <a onClick={() => this.setState({
                                        legendsActive: false
                                    })}>Ranked Stats</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                {
                    this.state.legendsActive ? (
                        <div className='columns is-multiline'>
                            {
                                this.state.obtuvoData ? this.renderLegends() : null
                            }
                        </div>
                    ) : (
                        this.state.obtuvoData ? 
                            (
                                <div>
                                    <div className='columns'>
                                        <div className='column'>
                                            <div className='card'>
                                                <div className='card-content'>
                                                    <div className='media'>
                                                        <div className='media-left'>
                                                            <figure className='image is-48x48'>
                                                                <img src={this.state.userInfo.rankHistory[0].rankIconUrl} alt='rank-icon' />
                                                            </figure>
                                                        </div>
                                                        <div className='media-content'>
                                                            <p className='title is-4'>
                                                                {this.state.userInfo.rankHistory[0].rankName}
                                                            </p>
                                                            <p className='subtitle is-6'>
                                                                El primer registro indica que inicio en {this.state.userInfo.rankHistory[0].rankName}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='column'>
                                            <div className='card'>
                                                <div className='card-content'>
                                                    <div className='media'>
                                                        <div className='media-left'>
                                                            <figure className='image is-48x48'>
                                                                <img src={this.state.userInfo.rankHistory[this.state.userInfo.rankHistory.length - 1].rankIconUrl} alt='rank-icon' />
                                                            </figure>
                                                        </div>
                                                        <div className='media-content'>
                                                            <p className='title is-4'>
                                                                {this.state.userInfo.rankHistory[this.state.userInfo.rankHistory.length - 1].rankName}
                                                            </p>
                                                            <p className='subtitle is-6'>
                                                                Actualmente el jugador se encuentra en {this.state.userInfo.rankHistory[this.state.userInfo.rankHistory.length - 1].rankName}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {this.renderRankedGraph()}
                                </div>
                            ) : null
                    )
                }
            </div>
        )
    }
}

export default ApexUser