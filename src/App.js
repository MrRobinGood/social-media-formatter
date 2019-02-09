import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'
import PropTypes from 'prop-types'
import { Container, Form, TextArea, Button,
  Divider,
  Grid,
  Header,
  Message,
  Icon,
  Step,
  Table,
  Image,
  List,
  Menu,
  Responsive,
  Segment,
  Sidebar,
  Visibility, } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'

function insertAtCursor(myField, myValue) {
  //MOZILLA and others
  if (myField.selectionStart || myField.selectionStart == '0') {
      var startPos = myField.selectionStart;
      var endPos = myField.selectionEnd;
      myField.value = myField.value.substring(0, startPos)
          + myValue
          + myField.value.substring(endPos, myField.value.length);
          myField.focus();
          myField.selectionEnd = endPos + 1;
  } else {
      myField.value += myValue;
  }
}


const TableCell = (props) => (
            <Table.Cell id={props.id}
              onClick={(e)=> props.handleClick(props.id)}
              >
              {props.children}
            </Table.Cell>
)


// jsx-a11y/accessible-emoji
class EmoticonsGrid extends Component {

  handleClick(id) {
    var str = document.getElementById(id).innerText
    console.log(str)
    var box = document.getElementById("formatter")
    // var cursorPosition = document.getElementById('formatter').prop("selectionStart")
    // var cursorPosition = getCursorPos(document.getElementById('formatter'))
    insertAtCursor(box, str)
  }

  // <Table.Cell id="hearth"
  // onClick={(e)=> this.handleClick(e.target.id)}
  // >🤩</Table.Cell>


  render() {
    return (
      <Table celled>
        <Table.Body>
          <Table.Row>
            <TableCell id="uno" className="emoji" handleClick={this.handleClick}>
              <span className="emoji-punto">•</span>
            </TableCell>
            <TableCell id="due" className="emoji" handleClick={this.handleClick}>
              <span className="emoji">✅</span> 
            </TableCell>
            <TableCell id="tre" className="emoji" handleClick={this.handleClick}>
              <span className="emoji">⚠</span>
            </TableCell>
          </Table.Row>
          <Table.Row>
            <TableCell id="quattro" className="emoji" handleClick={this.handleClick}>
              <span className="emoji">➡</span>
            </TableCell>
            <TableCell id="cinque" className="emoji" handleClick={this.handleClick}>
              <span className="emoji">⭕</span> 
            </TableCell>
            <TableCell id="sei" className="emoji" handleClick={this.handleClick}>
              <span className="emoji">✴</span>
            </TableCell>
          </Table.Row>
          <Table.Row>
            <TableCell id="sette" className="emoji" handleClick={this.handleClick}>
              <span className="emoji">🔴</span>
            </TableCell>
            <TableCell id="otto" className="emoji" handleClick={this.handleClick}>
              <span className="emoji">▪</span>
            </TableCell>
            <TableCell id="nove" className="emoji" handleClick={this.handleClick}>
              <span className="emoji">▶</span>
            </TableCell>
          </Table.Row>
        </Table.Body>
      </Table>
    )
  }
}

const Instructions = () => (
  <div>
  <br/>
  <h4>Istruzioni</h4>
  <Step.Group stackable='tablet' >
    <Step>
      <Step.Content>
        <Step.Title>1) Scrivi</Step.Title>
        <Step.Description>
        Inserisci il contenuto del tuo post <br/>  nell’apposito box e formattalo come desideri. 
        </Step.Description>
      </Step.Content>
    </Step>
    <Step>
      <Step.Content>
        <Step.Title>2) Converti</Step.Title>
        <Step.Description>
        Clicca il bottone “Formatta & Copia” <br/> per convertire il tuo testo e copiarlo.
        </Step.Description>
      </Step.Content>
    </Step>
    <Step>
      <Step.Content>
        <Step.Title>3) Incolla</Step.Title>
        <Step.Description>Vai sul social dove <br/> intendi pubblicare e “incolla”.</Step.Description>
      </Step.Content>
    </Step>
  </Step.Group>
  </div>
)



class HomepageHeading extends Component {
  constructor() {
    super()
    this.copyToClipboard = this.copyToClipboard.bind(this)
  }

  copyToClipboard(el) {
    var str = document.getElementById("formatter").value
    str = str.replace(/(?:\r\n|\r|\n)/g, "\u2063\n")
      document.getElementById("formatter").value = str
      // resolve the element
      el = (typeof el === 'string') ? document.querySelector(el) : el
      // handle iOS as a special case
      if (navigator.userAgent.match(/ipad|ipod|iphone/i)) {
          // save current contentEditable/readOnly status
          var editable = el.contentEditable
          var readOnly = el.readOnly
          // convert to editable with readonly to stop iOS keyboard opening
          el.contentEditable = true
          el.readOnly = true
          // create a selectable range
          var range = document.createRange()
          range.selectNodeContents(el)
          // select the range
          var selection = window.getSelection()
          selection.removeAllRanges()
          selection.addRange(range)
          el.setSelectionRange(0, 999999)
          // restore contentEditable/readOnly to original state
          el.contentEditable = editable
          el.readOnly = readOnly
      }
      else {
          el.select()
      }

      // execute copy command
      document.execCommand('copy')

      alert('Il tuo testo *formattato* è ora pronto per essere incollato ' +
      'nel tuo social preferito.')
    }

  render() {
    return (
      
      <Container text>
        <br/>
        <Header
          as='h1'
          content='Social Media Formatter'
          inverted
          style={{
            fontSize: this.props.mobile ? '2em' : '4em',
            fontWeight: 'normal',
            marginBottom: 0,
            //marginTop: this.props.mobile ? '1.5em' : '3em',
          }}
        />
        <Header
          as='h6'
          inverted
          style={{
            fontSize: this.props.mobile ? '0.7em' : '0.9em',
            fontWeight: 'normal',
            marginTop: this.props.mobile ? '0em' : '0em',
          }}
        >
        by Robin Good <Image circular src='/images/robin-icon.png' />
        </Header>
        <br/>
        <Message color='black'>
          <p>
          Formatta i testi per Instagram, Facebook e altri social <br/>
          potendo mantenere spaziature e righe vuote fra paragrafi
          </p>
        </Message>

        <Grid>
        <Grid.Column width={13}>
          <Form onSubmit={() => {
            this.copyToClipboard('.js-copytextarea')
          }}>
            <TextArea placeholder='' id="formatter" className="js-copytextarea"  style={{ minHeight: 150 }} />
            <br/>
            <br/>
          </Form>
        </Grid.Column>
        <Grid.Column width={3}>
          <EmoticonsGrid />
        </Grid.Column>
      </Grid>
      <button className="ui primary button block" onClick={() => this.copyToClipboard('.js-copytextarea')}>Formatta e copia</button>
      </Container>)
  }
}

const getWidth = () => {
  const isSSR = typeof window === 'undefined'

  return isSSR ? Responsive.onlyTablet.minWidth : window.innerWidth
}


/* Heads up!
 * Neither Semantic UI nor Semantic UI React offer a responsive navbar, however, it can be implemented easily.
 * It can be more complicated, but you can create really flexible markup.
 */
class DesktopContainer extends Component {
  state = {}

  hideFixedMenu = () => this.setState({ fixed: false })
  showFixedMenu = () => this.setState({ fixed: true })

  render() {
    const { children } = this.props
    const { fixed } = this.state

    return (
      <Responsive getWidth={getWidth} minWidth={Responsive.onlyTablet.minWidth}>
        <Visibility
          once={false}
          onBottomPassed={this.showFixedMenu}
          onBottomPassedReverse={this.hideFixedMenu}
        >
          <Segment
            inverted
            textAlign='center'
            style={{padding: '1em 0em' }}
            className="custom-segment"
            vertical
          >
           {/**
          <Menu
              fixed={fixed ? 'top' : null}
              inverted={!fixed}
              pointing={!fixed}
              secondary={!fixed}
              size='large'
            >
              <Container>
                <Menu.Item as='a' active>
                  Home
                </Menu.Item>
                <Menu.Item as='a'>Link</Menu.Item>
                <Menu.Item as='a'>Link2</Menu.Item>
                <Menu.Item as='a'>Link3</Menu.Item>
              </Container>
            </Menu>
          */} 
            <HomepageHeading />
            <Instructions />
          </Segment>
        </Visibility>

      </Responsive>
    )
  }
}

DesktopContainer.propTypes = {
  children: PropTypes.node,
}

class MobileContainer extends Component {
  state = {}

  handleSidebarHide = () => this.setState({ sidebarOpened: false })

  handleToggle = () => this.setState({ sidebarOpened: true })

  render() {
    const { children } = this.props
    const { sidebarOpened } = this.state

    return (
      <Responsive
        as={Sidebar.Pushable}
        getWidth={getWidth}
        maxWidth={Responsive.onlyMobile.maxWidth}
      >

        {/**
        
        <Sidebar
          as={Menu}
          animation='push'
          inverted
          onHide={this.handleSidebarHide}
          vertical
          visible={sidebarOpened}
        >
          <Menu.Item as='a' active>
            Home
          </Menu.Item>
          <Menu.Item as='a'>Link</Menu.Item>
          <Menu.Item as='a'>Link2</Menu.Item>
          <Menu.Item as='a'>Link3</Menu.Item>
        </Sidebar>
        
        */}
        

        <Sidebar.Pusher dimmed={sidebarOpened}>
          <Segment
            inverted
            textAlign='center'
            style={{padding: '1em 0em' }}
            className="custom-segment"
            vertical
          >
            <Container>
              {/* <Menu inverted pointing secondary size='large'>
                <Menu.Item onClick={this.handleToggle}>
                  <Icon name='sidebar' />
                </Menu.Item>
                <Menu.Item position='right'>
                  <Button as='a' inverted>
                    Log in
                  </Button>
                  <Button as='a' inverted style={{ marginLeft: '0.5em' }}>
                    Sign Up
                  </Button>
                </Menu.Item>
    </Menu> */}
            </Container>
            <HomepageHeading mobile />
            <Instructions />
          </Segment>

        </Sidebar.Pusher>
      </Responsive>
    )
  }
}

MobileContainer.propTypes = {
  children: PropTypes.node,
}

const ResponsiveContainer = ({ children }) => (
  <div>
    <DesktopContainer>{children}</DesktopContainer>
    <MobileContainer>{children}</MobileContainer>
  </div>
)

ResponsiveContainer.propTypes = {
  children: PropTypes.node,
}

const HomepageLayout = () => (
  <ResponsiveContainer>
    <Segment style={{ padding: '8em 0em' }} vertical>
      <Grid container stackable verticalAlign='middle'>
        <Grid.Row>
          <Grid.Column width={8}>
            <Header as='h3' style={{ fontSize: '2em' }}>
              We Help Companies and Companions
            </Header>
            <p style={{ fontSize: '1.33em' }}>
              We can give your company superpowers to do things that they never thought possible.
              Let us delight your customers and empower your needs... through pure data analytics.
            </p>
            <Header as='h3' style={{ fontSize: '2em' }}>
              We Make Bananas That Can Dance
            </Header>
            <p style={{ fontSize: '1.33em' }}>
              Yes that's right, you thought it was the stuff of dreams, but even bananas can be
              bioengineered.
            </p>
          </Grid.Column>
          <Grid.Column floated='right' width={6}>
            <Image bordered rounded size='large' src='/images/wireframe/white-image.png' />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column textAlign='center'>
            <Button size='huge'>Check Them Out</Button>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>
    <Segment style={{ padding: '0em' }} vertical>
      <Grid celled='internally' columns='equal' stackable>
        <Grid.Row textAlign='center'>
          <Grid.Column style={{ paddingBottom: '5em', paddingTop: '5em' }}>
            <Header as='h3' style={{ fontSize: '2em' }}>
              "What a Company"
            </Header>
            <p style={{ fontSize: '1.33em' }}>That is what they all say about us</p>
          </Grid.Column>
          <Grid.Column style={{ paddingBottom: '5em', paddingTop: '5em' }}>
            <Header as='h3' style={{ fontSize: '2em' }}>
              "I shouldn't have gone with their competitor."
            </Header>
            <p style={{ fontSize: '1.33em' }}>
              <Image avatar src='/images/avatar/large/nan.jpg' />
              <b>Nan</b> Chief Fun Officer Acme Toys
            </p>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>
    <Segment style={{ padding: '8em 0em' }} vertical>
      <Container text>
        <Header as='h3' style={{ fontSize: '2em' }}>
          Breaking The Grid, Grabs Your Attention
        </Header>
        <p style={{ fontSize: '1.33em' }}>
          Instead of focusing on content creation and hard work, we have learned how to master the
          art of doing nothing by providing massive amounts of whitespace and generic content that
          can seem massive, monolithic and worth your attention.
        </p>
        <Button as='a' size='large'>
          Read More
        </Button>
        <Divider
          as='h4'
          className='header'
          horizontal
          style={{ margin: '3em 0em', textTransform: 'uppercase' }}
        >
          <a href='#'>Case Studies</a>
        </Divider>
        <Header as='h3' style={{ fontSize: '2em' }}>
          Did We Tell You About Our Bananas?
        </Header>
        <p style={{ fontSize: '1.33em' }}>
          Yes I know you probably disregarded the earlier boasts as non-sequitur filler content, but
          it's really true. It took years of gene splicing and combinatory DNA research, but our
          bananas can really dance.
        </p>
        <Button as='a' size='large'>
          I'm Still Quite Interested
        </Button>
      </Container>
    </Segment>
    <Segment inverted vertical style={{ padding: '5em 0em' }}>
      <Container>
        <Grid divided inverted stackable>
          <Grid.Row>
            <Grid.Column width={3}>
              <Header inverted as='h4' content='About' />
              <List link inverted>
                <List.Item as='a'>Sitemap</List.Item>
                <List.Item as='a'>Contact Us</List.Item>
                <List.Item as='a'>Religious Ceremonies</List.Item>
                <List.Item as='a'>Gazebo Plans</List.Item>
              </List>
            </Grid.Column>
            <Grid.Column width={3}>
              <Header inverted as='h4' content='Services' />
              <List link inverted>
                <List.Item as='a'>Banana Pre-Order</List.Item>
                <List.Item as='a'>DNA FAQ</List.Item>
                <List.Item as='a'>How To Access</List.Item>
                <List.Item as='a'>Favorite X-Men</List.Item>
              </List>
            </Grid.Column>
            <Grid.Column width={7}>
              <Header as='h4' inverted>
                Footer Header
              </Header>
              <p>
                Extra space for a call to action inside the footer that could help re-engage users.
              </p>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    </Segment>
  </ResponsiveContainer>
)
export default HomepageLayout




// export default App
