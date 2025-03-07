import { TacademicSemester } from '../academicSemester/academicSemester.interface';
import { User } from './user.model';

const findLastStudnt = async () => {
  const lastStudent = await User.findOne(
    {
      role: 'student',
    },
    {
      id: 1,
      _id: 0,
    },
  )
    .sort({
      createdAt: -1,
    })
    .lean();

  return lastStudent?.id ? lastStudent.id.substring(6) : undefined;
};

// * year , semester , 4 digit number // // 2028 03 0001
export const genareateStudentId = async (payload: TacademicSemester) => {
  //   This will happen only first time ,
  const currentId = (await findLastStudnt()) || (0).toString();

  let incrementId = (Number(currentId) + 1).toString().padStart(4, '0');

  incrementId = `${payload.year}${payload.code}${incrementId}`;

  return incrementId;
};
