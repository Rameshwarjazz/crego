import { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const ExpressionEngineUI = () => {
  const [connectorType, setConnectorType] = useState('AND');
  const [expressions, setExpressions] = useState([
    { ruleType: 'Age', operator: '>', value: '', score: '' },
  ]);
  const [output, setOutput] = useState(null);

  const handleConnectorTypeChange = (e) => {
    setConnectorType(e.target.value);
  };

  const handleExpressionChange = (index, field, value) => {
    const updatedExpressions = [...expressions];
    updatedExpressions[index][field] = value;
    setExpressions(updatedExpressions);
  };

  const addExpression = () => {
    setExpressions([...expressions, { ruleType: 'Age', operator: '>', value: '', score: '' }]);
  };

  const removeExpression = (index) => {
    const updatedExpressions = expressions.filter((_, i) => i !== index);
    setExpressions(updatedExpressions);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const rules = expressions.map((expression) => ({
      key: expression.ruleType.toLowerCase(),
      output: {
        value: parseFloat(expression.value),
        operator: expression.operator,
        score: parseInt(expression.score, 10),
      },
    }));

    const result = {
      rules,
      combinator: connectorType.toLowerCase(),
    };

    setOutput(result);
  };

  return (
    <Container className="mt-5">
      <Row>
        <Col>
          <h1 className="text-center">Expression Engine UI</h1>
        </Col>
      </Row>
      <Row className="mt-3">
        <Col md={{ span: 6, offset: 3 }}>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formConnectorType">
              <Form.Label>Connector Type:</Form.Label>
              <Form.Control as="select" value={connectorType} onChange={handleConnectorTypeChange}>
                <option value="AND">AND</option>
                <option value="OR">OR</option>
              </Form.Control>
            </Form.Group>

            {expressions.map((expression, index) => (
              <div key={index} className="mb-3">
                <h5>Expression {index + 1}</h5>
                <Form.Group controlId={`formRuleType${index}`}>
                  <Form.Label>Rule Type:</Form.Label>
                  <Form.Control
                    as="select"
                    value={expression.ruleType}
                    onChange={(e) => handleExpressionChange(index, 'ruleType', e.target.value)}
                  >
                    <option value="Age">Age</option>
                    <option value="CreditScore">Credit Score</option>
                    <option value="AccountBalance">Account Balance</option>
                  </Form.Control>
                </Form.Group>
                <Form.Group controlId={`formOperator${index}`}>
                  <Form.Label>Operator:</Form.Label>
                  <Form.Control
                    as="select"
                    value={expression.operator}
                    onChange={(e) => handleExpressionChange(index, 'operator', e.target.value)}
                  >
                    <option value=">">{'>'}</option>
                    <option value="<">{'<'}</option>
                    <option value="≥">{'≥'}</option>
                    <option value="≤">{'≤'}</option>
                    <option value="=">{'='}</option>
                  </Form.Control>
                </Form.Group>
                <Form.Group controlId={`formValue${index}`}>
                  <Form.Label>Value:</Form.Label>
                  <Form.Control
                    type="text"
                    value={expression.value}
                    onChange={(e) => handleExpressionChange(index, 'value', e.target.value)}
                  />
                </Form.Group>
                <Form.Group controlId={`formScore${index}`}>
                  <Form.Label>Score:</Form.Label>
                  <Form.Control
                    type="text"
                    value={expression.score}
                    onChange={(e) => handleExpressionChange(index, 'score', e.target.value)}
                  />
                </Form.Group>
                <Button variant="danger" onClick={() => removeExpression(index)}>
                  Remove Expression
                </Button>
              </div>
            ))}

            <Button variant="primary" onClick={addExpression}>
              Add Expression
            </Button>

            <Button variant="primary" type="submit" className="mt-3">
              Submit
            </Button>
          </Form>
          {output && (
            <div className="mt-3">
              <h2>Result:</h2>
              <pre>{JSON.stringify(output, null, 2)}</pre>
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default ExpressionEngineUI;
