Feature: Frontend Testing
    
    Testing frontend

    Background: Testing Calculator
        Given the user is on "http://localhost:4600/"
        When the user inserts first value 4 
        When the user inserts second value 2 

    Example: Addition
        And input operator 'add'
        When click Calculate
        Then result should be 7
        
