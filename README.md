# Note

Phần này ghi bằng Tiếng Việt cho mọi người dễ hiểu:

- Reducer của mình sẽ tổ chức như sau.
- Trong category sẽ chứa nhiều course, trong course chứa nhiều topic lớn (các part), trong topic lớn
  chứa nhiều topic nhỏ (các bài học, bài tập, bài thi) và trong bài tập, bài thi sẽ chứa các câu hỏi.
- 1 state sẽ có cả mảng data chứa allData và currentData.
- Ví dụ: chúng ta muốn truy cập tới 1 topic nhỏ, nhưng vẫn muốn lưu các thông tin của topic nhỏ còn lại,
  thì lưu toàn bộ topic nhỏ vào data và lưu topic mình đang truy cập vào current.
- Nếu mọi người làm, thì pull code mới nhất từ master về, không hiểu đoạn nào thì hỏi mình, sau đó khi push code mới lên thì ping mình vào review, cấm không được push thẳng lên master.

**Mai Gia Bảo Anh**

### Version 1.0

25/3/2020

- Created project's boilerplate

### Version 1.1

12/5/2020

- Created layout for game page with fake data

### Version 1.2

14/5/2020

- Initialized category, course, topic reducer
- Initialized category, course, topic action
- Initialized category, course, topic saga
- Modified whitelist property in redux-persist
- First step to fetch data from real api
- Created layout for category, course, topic page

### Version 1.2.1

14/5/2020

- Added diary notebook in README.md file

### Version 1.3

15/5/2020

- Added topic, lesson, assignment domain, screen, reducer, action, saga
- Rename game to lesson
- Added get-topic-by-id and get-course-by-id api

### Version 1.4

16/5/2020

- Added interface for assignment page, loading component
- Seperate between assignment, lesson and topic
- Added fetch_on_progress and fetch_success
- Added real data and link
- Added root color variable
- Todo: must seperate between assignment and test

### Version 2.0

16/5/20202

- Added smallTopic and largeTopic state
- Reorganize all state
- Added fetch_on_progress and fetch_on_success in saga of its own action
- Todo: make breadcrumbs and current topic, current lesson

### Version 2.1

17/5/2020

- Move component out of its parent to reuse
- Added breadcrumb
- Added highlight current topic and current lesson.
- Todo: add category page, course page, topic page.
