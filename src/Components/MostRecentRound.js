import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

export const MostRecentRound = ({ round }) => {
    const { 
      courseName,
      par,
      total,
      slope,
      courseRating
    } = round;
    return (
        <Card>
            <CardContent>
                <Typography variant="h5">
                    {courseName}
                </Typography>
                <Typography variant="body2">
                    Par: {par}
                </Typography>
                <Typography variant="body2">
                    Difficulty: {courseRating}/{slope}
                </Typography>
                <Typography variant="body2">
                    Score: {total}
                </Typography>
            </CardContent>
        </Card>
    )
};