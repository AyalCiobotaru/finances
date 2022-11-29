package ac.myfinances.rest.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.annotations.ApiModelProperty;

import java.io.Serializable;
import java.util.Objects;

public class UpdateTransactionBody implements Serializable {
    private static final long serialVersionUID = 1L;
    @JsonProperty("oldTransaction")
    private TransactionDTO oldTransaction;

    @JsonProperty("updatedTransaction")
    private TransactionDTO updatedTransaction;

    /**
     * Get description
     * @return description
     */
    @ApiModelProperty(value = "")


    public TransactionDTO getOldTransaction() {
        return this.oldTransaction;
    }

    public void setOldTransaction(TransactionDTO transactionDTO) { this.oldTransaction = transactionDTO;
    }

    public UpdateTransactionBody oldTransaction(TransactionDTO transactionDTO) {
        this.oldTransaction = oldTransaction;
        return this;
    }

    /**
     * Get description
     * @return description
     */
    @ApiModelProperty(value = "")


    public TransactionDTO getUpdatedTransactionTransaction() {
        return this.updatedTransaction;
    }

    public void setUpdatedTransaction(TransactionDTO transactionDTO) { this.updatedTransaction = transactionDTO;
    }

    public UpdateTransactionBody updatedTransaction(TransactionDTO transactionDTO) {
        this.updatedTransaction = oldTransaction;
        return this;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        UpdateTransactionBody updateTransactionBody = (UpdateTransactionBody) o;
        return Objects.equals(this.updatedTransaction, updateTransactionBody.updatedTransaction) &&
                Objects.equals(this.oldTransaction, updateTransactionBody.oldTransaction);
    }

    @Override
    public int hashCode() {
        return Objects.hash(updatedTransaction, oldTransaction);
    }

    @Override
    public String toString() {
        StringBuilder sb = new StringBuilder();
        sb.append("class UpdateTransactionBody {\n");

        sb.append("    oldTransaction: ").append(toIndentedString(oldTransaction)).append("\n");
        sb.append("    updatedTransaction: ").append(toIndentedString(updatedTransaction)).append("\n");
        sb.append("}");
        return sb.toString();
    }

    /**
     * Convert the given object to string with each line indented by 4 spaces
     * (except the first line).
     */
    private String toIndentedString(Object o) {
        if (o == null) {
            return "null";
        }
        return o.toString().replace("\n", "\n    ");
    }
}
