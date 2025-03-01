import jsonfile from 'jsonfile';
import moment from 'moment';
import simpleGit from 'simple-git';
import random from 'random';

const FILE_PATH = './data.json';
const git = simpleGit();

const makeCommit = async (n) => {
  if (n === 0) {
    await git.push();
    return;
  }

  const startDate = moment('2024-11-01');
  const endDate = moment('2024-12-31');
  const randomDays = random.int(0, endDate.diff(startDate, 'days'));
  const DATE = startDate.clone().add(randomDays, 'days').format();

  const data = { date: DATE };
  console.log(DATE);

  await jsonfile.writeFile(FILE_PATH, data);
  await git.add([FILE_PATH]);
  await git.commit(DATE, { '--date': DATE });

  makeCommit(n - 1);
};

makeCommit(500);

