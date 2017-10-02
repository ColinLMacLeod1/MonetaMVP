import React from 'react'
import {Card, CardHeader, CardText} from 'material-ui/Card'
import FlatButton from 'material-ui/FlatButton';

const FeedbackComponent = ({getFeedback, userCount, feedback}) => (
  <div>
    <FlatButton label="Get Feedback" fullWidth={true} onClick={getFeedback} />
    {userCount}
    {feedback.map((feedback,index)=>
      <Card key={index}>
        <CardHeader
          title={feedback.username}
          subtitle={(new Date(feedback.date)).toString()}
        />
        <CardText>
          {'Suggestions: ' +feedback.suggestion}
        </CardText>
        <CardText>
          {'Issues: ' +feedback.issue}
        </CardText>
        <CardText>
          {'Likes: ' +feedback.likes}
        </CardText>
      </Card>
    ).reverse()}
  </div>
)

export default FeedbackComponent;
