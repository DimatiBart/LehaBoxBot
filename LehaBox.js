let factState = {};

const setState = (chatId, isLehaRight, timeStamp, isRepeated) => {
    factState[chatId] = {
        isLehaRight,
        timeStamp,
        isRepeated
    };
};

const makeFactRepeated = (chatId) => {
    factState[chatId].isRepeated = true;
};

const isFactOutdated = (chatId, currentTime) => (
    factState[chatId] ?
        factState[chatId].timeStamp + periodOfFact < currentTime :
        true
);

const checkLeha = () => Math.random() > 0.5;

const periodOfFact = 1000 * 60 * 15;

const getMessage = ({isLehaRight, isRepeated}) => {
    let factMessage = isLehaRight ? "Лёха прав": "Лёха неправ";
    return isRepeated ? `Повторяю, ${factMessage}` : factMessage;
};

const getMessageAccordingToState = (chatId) => {
    let currentTime = new Date();

    if (isFactOutdated(chatId, currentTime)) {
        //time to change bot's mind
        setState(chatId, checkLeha(), currentTime, false);
    }
    else {
        makeFactRepeated(chatId);
    }

    return getMessage(factState[chatId]);
};

module.exports = getMessageAccordingToState;