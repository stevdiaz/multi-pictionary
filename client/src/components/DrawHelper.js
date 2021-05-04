import React, { Component } from 'react';
import './DrawHelper.css';

import { drawStates } from '../helpers/constants';

export default class DrawHelper extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            makeAnnouncement: false,
            announcement: "",
            announcementId: 0,
        };
        this.announcementTime = 5000;
    }
    componentDidMount() {

    }
    componentDidUpdate(prevProps) {
        if (this.props.announcement !== prevProps.announcement) {
            this.setState(prevState => ({
                makeAnnouncement: true,
                announcement: this.props.announcement,
                announcementId: prevState.announcementId + 1,
            }), () => {
                const currAnnouncementId = this.state.announcementId;
                setTimeout(() => this.setNoAnnouncement(currAnnouncementId), this.announcementTime)
            });
        }
    }
    setNoAnnouncement(announcementId) {
        // set to false if the ids are identical (since we have already announced)
        this.setState(prevState => ({
            makeAnnouncement: announcementId != prevState.announcementId,
        }));
    }
    render() {
        var text = '';
        if (this.props.drawState === drawStates.choosingState) {
            text = "swipe left or right with fingers extended to switch word";
        } else if (this.props.drawState === drawStates.drawingState) {
            text = "say 'undo' or 'clear' to erase. hover over and grab colors or thickness levels";
        }
        if (this.state.makeAnnouncement) {
            text = this.state.announcement;
        }
        return (
            <div className='DrawHelper-container'>
                {text}
            </div>
        )
    }
}