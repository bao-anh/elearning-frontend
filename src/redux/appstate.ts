import { CourseState } from './reducers/course';
import { CategoryState } from './reducers/category';
import { TopicState } from './reducers/topic';
import { LessonState } from './reducers/lesson';
import { AssignmentState } from './reducers/assignment';
import { AuthState } from './reducers/auth';

export interface AppState {
  authState: AuthState;
  courseState: CourseState;
  categoryState: CategoryState;
  topicState: TopicState;
  lessonState: LessonState;
  assignmentState: AssignmentState;
}
