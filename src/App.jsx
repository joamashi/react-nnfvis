import React, { useState } from 'react';
import Button from './components/Button';
import './style.css';

const Header = (props) => {
  console.log(props); // {title: 'REACT'}
  return (
    <>
      <header>
        <h1>
          <a
            href="/"
            onClick={(event) => {
              event.preventDefault();
              props.onChangeMode();
            }}
          >
            {props.title}
          </a>
        </h1>
        <Button size="large">BUTTON</Button>
      </header>
    </>
  );
};

const Nav = (props) => {
  const list = [];
  for (let i = 0; i < props.topics.length; i++) {
    let t = props.topics[i];
    list.push(
      <li key={t.id}>
        <a
          id={t.id}
          href={'/read/' + t.id}
          onClick={(event) => {
            event.preventDefault();
            props.onChangeMode(Number(event.target.id));
          }}
        >
          {t.title}
        </a>
      </li>
    );
  }
  return (
    <>
      <ol>{list}</ol>
    </>
  );
};

const Article = (props) => {
  return (
    <>
      <article>
        <h2>{props.title}</h2>
        <p>{props.body}</p>
      </article>
    </>
  );
};

const Create = (props) => {
  return (
    <>
      <article>
        <h2>Create</h2>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            const title = event.target.title.value;
            const body = event.target.body.value;
            props.onCreate(title, body);
          }}
        >
          <p>
            <input type="text" name="title" placeholder="title" />
          </p>
          <p>
            <textarea name="body" placeholder="body"></textarea>
          </p>
          <p>
            <input type="submit" value="Create" />
          </p>
        </form>
      </article>
    </>
  );
};

const Update = (props) => {
  const [title, setTitle] = useState(props.title);
  const [body, setBody] = useState(props.body);
  return (
    <>
      <article>
        <h2>Update</h2>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            const title = event.target.title.value;
            const body = event.target.body.value;
            props.onUpdate(title, body);
          }}
        >
          <p>
            <input
              type="text"
              name="title"
              placeholder="title"
              value={title}
              onChange={(event) => {
                setTitle(event.target.value);
              }}
            />
          </p>
          <p>
            <textarea
              name="body"
              placeholder="body"
              value={body}
              onChange={(event) => {
                setBody(event.target.value);
              }}
            ></textarea>
          </p>
          <p>
            <input type="submit" value="Update" />
          </p>
        </form>
      </article>
    </>
  );
};

const App = () => {
  // const _mode = useState('WELCOME'); // ['WELCOME', ƒ]
  // const mode = _mode[0];
  // const setMode = _mode[1];
  const [modeAAA, setModeBBB] = useState('WELCOME');
  console.log(modeAAA, setModeBBB);
  // setModeBBB : dispatchSetState(fiber, queue, action)

  const [id, setId] = useState(null);

  // const topics = [
  //   { id: 1, title: 'html', body: 'html ...' },
  //   { id: 2, title: 'js', body: 'css ...' },
  //   { id: 3, title: 'css', body: 'js ...' },
  // ];
  const [nextId, setNextId] = useState(4);
  const [topics, setTopics] = useState([
    { id: 1, title: 'html', body: 'html ...' },
    { id: 2, title: 'js', body: 'js ...' },
    { id: 3, title: 'css', body: 'css ...' },
  ]);

  let content = null;
  let contextControl = null;

  if (modeAAA === 'WELCOME') {
    content = <Article title="welcome" body="Hello, WEB!"></Article>;
  } else if (modeAAA === 'READ') {
    let title,
      body = null;
    for (let i = 0; i < topics.length; i++) {
      console.log(topics[i].id, id);
      if (topics[i].id === id) {
        title = topics[i].title;
        body = topics[i].body;
      }
    }
    content = <Article title={title} body={body}></Article>;
    contextControl = (
      <>
        <li>
          <a
            href={'/update' + id}
            onClick={(event) => {
              event.preventDefault();
              setModeBBB('UPDATE');
            }}
          >
            update
          </a>
        </li>
        <li>
          <button
            type="button"
            onClick={() => {
              const newTopics = [];
              for (let i = 0; i < topics.length; i++) {
                if (topics[i].id !== id) {
                  newTopics.push(topics[i]);
                }
              }
              setTopics(newTopics);
              setModeBBB('WELCOME');
            }}
          >
            delete
          </button>
        </li>
      </>
    );
  } else if (modeAAA === 'CREATE') {
    content = (
      <Create
        onCreate={(_title, _body) => {
          console.log(_title, _body);
          const newTopic = { id: nextId, title: _title, body: _body };
          // topics.push(newTopic);
          // setTopics(topics);
          const newTopics = [...topics]; // newTopic 복사
          newTopics.push(newTopic); // newTopic 변경
          setTopics(newTopics);
          setModeBBB('READ');
          setId(nextId);
          setNextId(nextId + 1);
        }}
      ></Create>
    );
  } else if (modeAAA === 'UPDATE') {
    let title,
      body = null;
    for (let i = 0; i < topics.length; i++) {
      console.log(topics[i].id, id);
      if (topics[i].id === id) {
        title = topics[i].title;
        body = topics[i].body;
      }
    }
    content = (
      <Update
        title={title}
        body={body}
        onUpdate={(_title, _body) => {
          console.log(_title, _body);
          const newTopics = [...topics]; // newTopic 복사
          const updatedTopic = { id: id, title: _title, body: _body };
          for (let i = 0; i < newTopics.length; i++) {
            if (newTopics[i].id === id) {
              newTopics[i] = updatedTopic;
              break;
            }
          }
          setTopics(newTopics);
          setModeBBB('READ');
        }}
      ></Update>
    );
  }

  return (
    <>
      <Header
        title="REACT"
        onChangeMode={() => {
          // alert('Header');
          // mode = 'WELCOME';
          setModeBBB('WELCOME');
        }}
      ></Header>
      {/* 사용자 정의 태그 === 컴포넌트 */}

      <Nav
        topics={topics}
        onChangeMode={(_id) => {
          // alert(id);
          // mode = 'READ';
          setModeBBB('READ');
          setId(_id);
        }}
      ></Nav>

      {content}

      <ul>
        <li>
          <a
            href="/create"
            onClick={(event) => {
              event.preventDefault();
              setModeBBB('CREATE');
            }}
          >
            Create
          </a>
        </li>

        {contextControl}
      </ul>
    </>
  );
};

export default App;

/*
  Props : 컴포넌트를 사용하는 외부자를 위한 데이터
  State : 컴포넌트를 사용하는 내부자를 위한 데이터

  create / read / update / delete === CRUD

  ----------------------------------------------------------------------

  const [value, setValue] = useState(PRIMITIVE)
  PRIMITIVE = string, number, boolean, undefined, null, symbol, bigint

  const [value, setValue] = useState(Object)
  Object = Object, array

  newValue = {...value}
  newValue 변경
  setValue(newValue)
*/
