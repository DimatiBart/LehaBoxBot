let factState = {};

const setState = (isLehaRight, timeStamp, isRepeated) => {
    factState = {
        isLehaRight,
        timeStamp,
        isRepeated
    };
};

const makeFactRepeated = () => {
    factState.isRepeated = true;
};

const isFactOutdated = (currentTime) => factState.timeStamp + periodOfFact < currentTime;

setState(false, 0, false);

const checkLeha = () => Math.random() > 0.5;

const periodOfFact = 1000 * 60 * 15;

const getMessage = ({isLehaRight, isRepeated}) => {
    let factMessage = isLehaRight ? "Лёха прав": "Лёха неправ";
    return isRepeated ? `Повторяю, ${factMessage}` : factMessage;
};

const getMessageAccordingToState = () => {
    let currentTime = new Date();

    if (isFactOutdated(currentTime)) {
        //time to change bot's mind
        setState(checkLeha(), currentTime, false);
    }
    else {
        makeFactRepeated();
    }

    return getMessage(factState);
};

module.exports = getMessageAccordingToState;