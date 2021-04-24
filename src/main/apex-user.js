import React, { Component } from "react";

class ApexUser extends Component {

    state = {
        leyendas: [
            {
                name: "Mirage",
                imageUrl: "https://trackercdn.com/cdn/apex.tracker.gg/legends/mirage-tile.png",
                tallImageUrl: "https://trackercdn.com/cdn/apex.tracker.gg/legends/mirage-tall.png",
                bgImageUrl: "https://trackercdn.com/cdn/apex.tracker.gg/legends/mirage-concept-bg-small.jpg",
                isActive: false,
                kills: 33.0,
                percentile: 22.0
            },
            {
                name: "Octane",
                imageUrl: "https://trackercdn.com/cdn/apex.tracker.gg/legends/octane-tile.png",
                tallImageUrl: "https://trackercdn.com/cdn/apex.tracker.gg/legends/octane-tall.png",
                bgImageUrl: "https://trackercdn.com/cdn/apex.tracker.gg/legends/octane-concept-bg-small.jpg",
                isActive: false,
                kills: 201.0,
                percentile: 73.0
            },
            {
                name: "Mirage",
                imageUrl: "https://trackercdn.com/cdn/apex.tracker.gg/legends/mirage-tile.png",
                tallImageUrl: "https://trackercdn.com/cdn/apex.tracker.gg/legends/mirage-tall.png",
                bgImageUrl: "https://trackercdn.com/cdn/apex.tracker.gg/legends/mirage-concept-bg-small.jpg",
                isActive: false,
                kills: 33.0,
                percentile: 22.0
            },
            {
                name: "Octane",
                imageUrl: "https://trackercdn.com/cdn/apex.tracker.gg/legends/octane-tile.png",
                tallImageUrl: "https://trackercdn.com/cdn/apex.tracker.gg/legends/octane-tall.png",
                bgImageUrl: "https://trackercdn.com/cdn/apex.tracker.gg/legends/octane-concept-bg-small.jpg",
                isActive: false,
                kills: 201.0,
                percentile: 73.0
            },
            {
                name: "Mirage",
                imageUrl: "https://trackercdn.com/cdn/apex.tracker.gg/legends/mirage-tile.png",
                tallImageUrl: "https://trackercdn.com/cdn/apex.tracker.gg/legends/mirage-tall.png",
                bgImageUrl: "https://trackercdn.com/cdn/apex.tracker.gg/legends/mirage-concept-bg-small.jpg",
                isActive: false,
                kills: 33.0,
                percentile: 22.0
            },
            {
                name: "Octane",
                imageUrl: "https://trackercdn.com/cdn/apex.tracker.gg/legends/octane-tile.png",
                tallImageUrl: "https://trackercdn.com/cdn/apex.tracker.gg/legends/octane-tall.png",
                bgImageUrl: "https://trackercdn.com/cdn/apex.tracker.gg/legends/octane-concept-bg-small.jpg",
                isActive: false,
                kills: 201.0,
                percentile: 73.0
            },
            {
                name: "Mirage",
                imageUrl: "https://trackercdn.com/cdn/apex.tracker.gg/legends/mirage-tile.png",
                tallImageUrl: "https://trackercdn.com/cdn/apex.tracker.gg/legends/mirage-tall.png",
                bgImageUrl: "https://trackercdn.com/cdn/apex.tracker.gg/legends/mirage-concept-bg-small.jpg",
                isActive: false,
                kills: 33.0,
                percentile: 22.0
            },
            {
                name: "Octane",
                imageUrl: "https://trackercdn.com/cdn/apex.tracker.gg/legends/octane-tile.png",
                tallImageUrl: "https://trackercdn.com/cdn/apex.tracker.gg/legends/octane-tall.png",
                bgImageUrl: "https://trackercdn.com/cdn/apex.tracker.gg/legends/octane-concept-bg-small.jpg",
                isActive: false,
                kills: 201.0,
                percentile: 73.0
            },
            {
                name: "Mirage",
                imageUrl: "https://trackercdn.com/cdn/apex.tracker.gg/legends/mirage-tile.png",
                tallImageUrl: "https://trackercdn.com/cdn/apex.tracker.gg/legends/mirage-tall.png",
                bgImageUrl: "https://trackercdn.com/cdn/apex.tracker.gg/legends/mirage-concept-bg-small.jpg",
                isActive: false,
                kills: 33.0,
                percentile: 22.0
            },
            {
                name: "Octane",
                imageUrl: "https://trackercdn.com/cdn/apex.tracker.gg/legends/octane-tile.png",
                tallImageUrl: "https://trackercdn.com/cdn/apex.tracker.gg/legends/octane-tall.png",
                bgImageUrl: "https://trackercdn.com/cdn/apex.tracker.gg/legends/octane-concept-bg-small.jpg",
                isActive: false,
                kills: 201.0,
                percentile: 73.0
            }
        ]
    }

    renderLegends() {
        return this.state.leyendas.map(item => {
            return (
                <div className='column is-3'>
                    <div className='columns'>
                        <div className='column is-12'>
                            <img src={item.imageUrl} />
                        </div>
                    </div>
                    <div className='columns is-multiline is-centered'>
                        <div className='column p-0 is-12 is-size-4 has-text-centered'>
                            {item.kills}
                        </div>
                        <div className='column p-0 is-12 is-size-4 has-text-centered'>
                            Eliminaciones
                        </div>
                    </div>
                </div>
            )
        })
    }

    render() {
        return (
            <div className='mt-6'>
                <div className='columns is-mobile is-centered'>
                    <div className='column is-narrow'>
                        <figure className='image is-128x128'>
                            <img className='is-rounded' src='https://bulma.io/images/placeholders/128x128.png' />
                        </figure>
                    </div>
                </div>
                <div className='columns is-mobile is-centered mb-1'>
                    <div className='column is-narrow pb-0'>
                        <h4 className='title is-4'>EzioA</h4>
                    </div>
                </div>
                <div className='columns is-mobile is-centered'>
                    <div className='column is-narrow'>
                        Origin
                    </div>
                </div>
                <div className='columns is-multiline'>
                    {
                        this.renderLegends()
                    }
                </div>
            </div>
        )
    }
}

export default ApexUser