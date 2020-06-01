# Todo list

- Làm tính năng Flashcard [3]
- Validate Signin, Register page [2]

**Mai Gia Bảo Anh**

### Version 1.0

25/3/2020

- Created project's boilerplate.

### Version 1.1

12/5/2020

- Created layout for game page with fake data.

### Version 1.2

14/5/2020

- Initialized category, course, topic reducer.
- Initialized category, course, topic action.
- Initialized category, course, topic saga.
- Modified whitelist property in redux-persist.
- First step to fetch data from real api.
- Created layout for category, course, topic page.

### Version 1.2.1

14/5/2020

- Added diary notebook in README.md file.

### Version 1.3

15/5/2020

- Added topic, lesson, assignment domain, screen, reducer, action, saga.
- Rename game to lesson.
- Added get-topic-by-id and get-course-by-id api.

### Version 1.4

16/5/2020

- Added interface for assignment page, loading component.
- Seperate between assignment, lesson and topic.
- Added fetch_on_progress and fetch_success.
- Added real data and link.
- Added root color variable.
- Todo: must seperate between assignment and test.

### Version 2.0

16/5/20202

- Added smallTopic and largeTopic state.
- Reorganize all state.
- Added fetch_on_progress and fetch_on_success in saga of its own action.
- Todo: make breadcrumbs and current topic, current lesson.

### Version 2.1

17/5/2020

- Move component out of its parent to reuse.
- Added breadcrumb.
- Added highlight current topic and current lesson.
- Todo: add category page, course page, topic page.

### Version 2.2

18/5/2020

- Added category page, course page, topic page.
- Fix breadcrumb link, hightlight current topic, current lesson.
- Added banner component.

### Version 2.3

19/5/2020

- Added sign-in and register page.
- Added snackbar.
- Remove redundant file when init-project.
- Added private and public route.
- Use **https://elearning-server.herokuapp.com** as server API.
- Added background and translate icon.
- Added layout component.

### Version 3.0

21/5/2020

- Adjust all page, action, reducer, saga to compatible with backend.
- Test perfectly and be able to design assignment feature.
- Change note in README.md to Todo list.

### Version 3.1

23/5/2020

- Added test mechanic.
- Fix some bug of loading page.

### Version 3.2

24/5/2020

- Added progress.
- Fix authenticate bug.
- Fix bug when change user.
- Clear redux persist store, only remain authState.

### Version 3.3

25/5/2020

- Added purchase course mechanic.
- Prevent user to access course, which isn't purchased.
- Fix some bug in category page.

### Version 3.4

25/5/2020

- Added utility page.

### Version 3.5

26/5/2020

- Added all data in TOEIC 450-600+ course.
- Adjust assignment dialog to compatible with new data in question model.

### Version 4.0

27/5/2020

- Added create new target score in TOEIC page.
- Relocate file and folder.

### Version 4.1

28/5/2020

- Added full layout for toeic page.
- Added update TOEIC target score
- Fix bug not display script and content when question doesnt have children.

### Version 4.2

29/5/2020

- Added test single part and short test mechanic.
- Progress updated when complete a test.

### Version 4.3

30/5/2002

- Optimize test successfully, only rerender needed question cluster.
- Successfully implement React.memo.
- We can proud of ourself today.

### Version 4.4

31/5/2020

- Added left sidebar.
- Move result page into whole new page in short test and full test.
- Decrease payload of test page.

### Version 4.5

1/6/2020

- Added homepage.
- Push code to heroku.
