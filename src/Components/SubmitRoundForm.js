import { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import FormHelperText from '@material-ui/core/FormHelperText';
import { makeStyles } from '@material-ui/core/styles';
import { MostRecentRound } from './MostRecentRound';
import Avatar from '@material-ui/core/Avatar';
import { green } from '@material-ui/core/colors';
import useMediaQuery from '@material-ui/core/useMediaQuery';

const useStyles = makeStyles((theme) => ({
    formContainer: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        margin: "10em 5em"
    },
    mobileContainer: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        margin: "8em 3em"
    },
    form: {
        display: "flex",
        flexDirection: "column",
        width: theme.spacing(35),
        marginRight: theme.spacing(10),
        marginBottom: theme.spacing(2)
    },
    round: {
        width: theme.spacing(70),
        marginBottom: theme.spacing(3)
    },
    mobileRound: {
        width: theme.spacing(35),
        marginBottom: theme.spacing(3)
    },
    roundContainer: {
        display: "flex",
        flexDirection: "column"
    },
    submitButton: {
      marginTop: theme.spacing(3)
    },
    wrapper: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        width: "auto"
    },
    mobileWrapper: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        width: "auto"
    }
  }));

export const SubmitRoundForm = () => {
    const classes = useStyles();
    const matches = useMediaQuery('(min-width:600px)');
    const [rounds, setRounds] = useState([]);
    const [courseName, setCourseName] = useState('');
    const [par, setPar] = useState('');
    const [courseRating, setCourseRating] = useState('');
    const [slope, setSlope] = useState('');
    const [total, setTotal] = useState('');
    const [handicap, setHandicap] = useState('');
    const resetFormFields = () => {
        setCourseName('');
        setPar('');
        setCourseRating('');
        setSlope('');
        setTotal('');
      };
    
      const calculateDifferential = () => {
        const diffVal = parseInt(total) - parseInt(courseRating);
        return diffVal * 113 / parseInt(slope);
      };
    
      const handleSetRound = async () => {
        const obj = {
          courseName,
          par: parseInt(par),
          courseRating: parseFloat(courseRating),
          slope: parseInt(slope),
          total: parseInt(total),
          differential: calculateDifferential()
        };
        let newArr = rounds;
        newArr.push(obj);
        setRounds(newArr);
        resetFormFields();
      };
    
      const handleSubmit = e => {
        e.preventDefault();
        handleSetRound();
      };
    
      useEffect(() => {
        let arr = [];
        rounds.map(round => arr.push(round.differential));
        console.log(arr)
        const sumOfDifferentials = arr.reduce((acc, currentVal) => acc + currentVal, 0)
        console.log(sumOfDifferentials);
        const average = sumOfDifferentials / arr.length;
        const handiVal = average * 0.96;
        setHandicap(handiVal.toFixed(1));
      }, [rounds, rounds.length]);
      
    return (
        <>
            <div className={matches ? classes.formContainer : classes.mobileContainer}>
                {handicap > 0 && (
                    <div style={{ display: "flex", marginBottom: "2em" }}>
                        <div style={{ marginRight: "1rem"}}>
                            <span>
                                <strong>
                                    Current <br />
                                    Handicap:
                                </strong>
                            </span>
                        </div>
                        <div style={{ display: "flex", alignItems: "center" }}>
                            <Avatar style={{ backgroundColor: green[500] }} variant="rounded">
                                <h5>{handicap}</h5>
                            </Avatar>
                        </div>
                    </div>
                )}
                <div className={matches ? classes.wrapper : classes.mobile}>
                    <form className={classes.form} onSubmit={handleSubmit}>
                    <h3>Most Recent Round</h3>
                    <FormControl>
                        <Input 
                        id="my-input" 
                        placeholder="Golf Course Name"
                        value={courseName}
                        onChange={e => setCourseName(e.target.value)}
                        />
                        <FormHelperText id="my-helper-text">Name of the course that you played.</FormHelperText>
                    </FormControl> 
                    <FormControl>   
                        <Input 
                        id="my-input" 
                        placeholder="Course Par"
                        value={par}
                        onChange={e => setPar(e.target.value)}
                        />
                        <FormHelperText id="my-helper-text">Par of the course that you played.</FormHelperText>
                    </FormControl> 
                    <FormControl>       
                        <Input 
                        id="my-input" 
                        placeholder="Course Rating"
                        value={courseRating}
                        onChange={e => setCourseRating(e.target.value)}
                        />
                        <FormHelperText id="my-helper-text">Course Rating of the course found on scorecard.</FormHelperText>
                    </FormControl>
                    <FormControl>            
                        <Input 
                        id="my-input" 
                        placeholder="Slope Rating"
                        value={slope}
                        onChange={e => setSlope(e.target.value)}
                        />
                        <FormHelperText id="my-helper-text">Slope Rating of the course found on scorecard.</FormHelperText>
                    </FormControl>     
                    <FormControl>  
                        <Input 
                        id="my-input" 
                        placeholder="Round Score" 
                        value={total}
                        onChange={e => setTotal(e.target.value)}
                        />
                        <FormHelperText id="my-helper-text">Total amount of strokes made in the round.</FormHelperText>
                    </FormControl>
                    <div>
                        <Button className={classes.submitButton} variant="contained" color="primary" type="submit">Submit</Button>
                    </div>
                    </form>
                    <div className={classes.roundContainer}>
                        <h3>Previous Rounds</h3>
                        {rounds && (rounds.map(round => (
                            <div key={rounds.indexOf(round)}>
                                <div className={matches ? classes.round : classes.mobileRound}>
                                    <MostRecentRound round={round} />
                                </div>
                            </div>
                        )))}
                    </div>
                </div>
            </div>
        </>
    );
}