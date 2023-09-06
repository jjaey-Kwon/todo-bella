import React, { useState, useRef, useCallback } from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import TodoTemplate from './TodoTemplate';
import TodoInsert from './TodoInsert';
import TodoList from './TodoList';
import TodoEdit from './TodoEdit';

function CustomTabPanel(props) {

  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


  const [todos, setTodos] = useState([
    {
      id: 1,
      text: '리액트의 기초 알아보기',
      checked: true,
  },
  { 
    id: 2,
    text: '컴포넌트 스타일링해 보기',
    checked: true,
  }, 
  {
    id: 3,
    text: '일정 관리 앱 만들어 보기',
    checked: false,
  },
]);


const [selectedTodo, setSelectedTodo] = useState(null);
const [insertToggle, setInsertToggle] = useState(false);


  // 고윳값으로 사용될 id
  // ref를 사용하여 변수 담기
  const nextId = useRef(4);

  const onInsertToggle = useCallback(() => {
    if (selectedTodo) {
      setSelectedTodo((selectedTodo) => null);
    }
    setInsertToggle((prev) => !prev);
  }, [selectedTodo]);

  const onChangeSelectedTodo = (todo) => {
    setSelectedTodo((selectedTodo) => todo);
  };

  const onInsert = useCallback(
    text => {
      const todo = {
        id: nextId.current,
        text,
        checked: false,
     };
    setTodos(todos.concat(todo));
    nextId.current += 1; // nextId 1 씩 더하기
  },
  [todos],
  );

  const onRemove = useCallback(
    id => {
      setTodos(todos.filter(todo => todo.id !== id));
    },
    [todos],
  );

  const onToggle = useCallback(
    id => {
      setTodos(
        todos.map(todo =>
        todo.id === id ? { ...todo, checked: !todo.checked } : todo,
        ),
      );
      },
    [todos],
    );

    const onUpdate = useCallback(
      (id, text) => {
        onInsertToggle();
  
        setTodos((todos) =>
          todos.map((todo) => (todo.id === id ? { ...todo, text } : todo)),
        );
      },
      [onInsertToggle],
    );


  return (
    <TodoTemplate>
      <TodoInsert onInsert={onInsert} />
      <Box sx={{ flex : 1 }}>
        <Box sx={{}}>
          <Tabs value={value} onChange={handleChange}>
            <Tab label="할 일 리스트" {...a11yProps(0)} />
            <Tab label="휴지통" {...a11yProps(1)} />
          </Tabs>
        </Box>
        
        <CustomTabPanel value={value} index={0}>
          <TodoList todos={todos} onRemove={onRemove} onToggle={onToggle} onChangeSelectedTodo={onChangeSelectedTodo} onInsertToggle={onInsertToggle} />
          {insertToggle && (
        <TodoEdit
          onInsert={onInsert}
          selectedTodo={selectedTodo}
          onInsertToggle={onInsertToggle}
          onUpdate={onUpdate}
          insertToggle={insertToggle}
        />
      )}
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>

        </CustomTabPanel>
      </Box>
    </TodoTemplate>
  );
}
