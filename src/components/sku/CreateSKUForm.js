import React from 'react'
class CreateSKUForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            productName : props.productName,
            skuCode : props.skuCode,
            skuStockQty : props.skuStockQty,
            sku : {},
            product : {},
            stock : {},
            data : {}
        }
    }
    handleChange(stateName) {
        return (event) => {
          this.setState({[stateName] : event.target.value})
        }
    }
    componentDidUpdate() {
        var sku = {
            code : this.state.skuCode
        } 
        var stock = {
            qty : parseInt(this.state.skuStockQty)
        }
        var product = {
            name : this.state.productName
        }
        var data = {
            componentId : this.props.componentId,
            id : this.props.id,
            sku : sku,
            product : product,
            stock : stock,
        }         
        if(this.props.dataSetter) {
            this.props.dataSetter(data)
        }
    }
    withSubmitButton(yes) {
        if(yes) {
            return (
                <button>Create</button>
            )
        }
    }
    render() {
        return (
            <table className={"table"}>
                <tbody>
                
                <tr>
                    <td><span>Name</span></td>
                    <td>
                        <input required={true} value={this.state.productName} className="form-control" onChange={this.handleChange("productName")}  />
                    </td>
                </tr>
                
                <tr>
                    <td>
                        <span>Code</span>
                    </td>                        
                    <td>
                        <input type="text" value={this.state.skuCode} required={true} className="form-control" onChange={this.handleChange("skuCode")}  />
                    </td>
                </tr>
                <tr>
                    <td>
                        <span>Quantity</span>                        
                    </td>
                    <td>
                        <input type="number" value={this.state.skuStockQty} required={true} className="form-control" onChange={this.handleChange("skuStockQty")}  />
                    </td>
                </tr>
                
                <tr>
                    <td colSpan={2}>
                        {this.withSubmitButton(this.props.withSubmitButton)}
                    </td>
                </tr>

                </tbody>
            </table>
        )
    }
}
export default CreateSKUForm