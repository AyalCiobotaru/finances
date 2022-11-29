package ac.myfinances.rest.model;

import java.math.BigDecimal;
import java.time.OffsetDateTime;
import java.util.Objects;

import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.annotations.ApiModelProperty;
import java.io.Serializable;
import javax.validation.Valid;


/**
 * TransactionDTO
 */
@javax.annotation.Generated(value = "org.openapitools.codegen.languages.SpringCodegen", date = "2022-11-10T22:47:30.445-05:00[America/New_York]")

public class TransactionDTO  implements Serializable {
  private static final long serialVersionUID = 1L;

  @JsonProperty("id")
  private String id;

  @JsonProperty("description")
  private String description;

  @JsonProperty("creditAccountId")
  private String creditAccountId;

  @JsonProperty("debitAccountId")
  private String debitAccountId;

  @JsonProperty("amount")
  private BigDecimal amount;

  @JsonProperty("date")
  @org.springframework.format.annotation.DateTimeFormat(iso = org.springframework.format.annotation.DateTimeFormat.ISO.DATE)
  private OffsetDateTime date;

  public TransactionDTO id(String id) {
    this.id = id;
    return this;
  }


  /**
   * Get id
   * @return id
   */
  @ApiModelProperty(value = "")


  public String getId() {
    return this.id;
  }

  public void setId(String id) {
    this.id = id;
  }
  public TransactionDTO description(String description) {
    this.description = description;
    return this;
  }


  /**
   * Get description
   * @return description
  */
  @ApiModelProperty(value = "")


  public String getDescription() {
    return this.description;
  }

  public void setDescription(String description) {
    this.description = description;
  }

  public TransactionDTO creditAccountId(String creditAccountId) {
    this.creditAccountId = creditAccountId;
    return this;
  }


  /**
   * Get creditAccountId
   * @return creditAccountId
  */
  @ApiModelProperty(value = "")


  public String getCreditAccountId() {
    return this.creditAccountId;
  }

  public void setCreditAccountId(String creditAccountId) {
    this.creditAccountId = creditAccountId;
  }

  public TransactionDTO debitAccountId(String debitAccountId) {
    this.debitAccountId = debitAccountId;
    return this;
  }


  /**
   * Get debitAccountId
   * @return debitAccountId
  */
  @ApiModelProperty(value = "")


  public String getDebitAccountId() {
    return this.debitAccountId;
  }

  public void setDebitAccountId(String debitAccountId) {
    this.debitAccountId = debitAccountId;
  }

  public TransactionDTO amount(BigDecimal amount) {
    this.amount = amount;
    return this;
  }


  /**
   * Get amount
   * @return amount
  */
  @ApiModelProperty(value = "")


  public BigDecimal getAmount() {
    return this.amount;
  }

  public void setAmount(BigDecimal amount) {
    this.amount = amount;
  }

  public TransactionDTO date(OffsetDateTime date) {
    this.date = date;
    return this;
  }


  /**
   * Get date
   * @return date
  */
  @ApiModelProperty(value = "")

  @Valid

  public OffsetDateTime getDate() {
    return this.date;
  }

  public void setDate(OffsetDateTime date) {
    this.date = date;
  }


  @Override
  public boolean equals(Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    TransactionDTO transactionDTO = (TransactionDTO) o;
    return Objects.equals(this.id, transactionDTO.id) &&
        Objects.equals(this.description, transactionDTO.description) &&
        Objects.equals(this.creditAccountId, transactionDTO.creditAccountId) &&
        Objects.equals(this.debitAccountId, transactionDTO.debitAccountId) &&
        Objects.equals(this.amount, transactionDTO.amount) &&
        Objects.equals(this.date, transactionDTO.date);
  }

  @Override
  public int hashCode() {
    return Objects.hash(id, description, creditAccountId, debitAccountId, amount, date);
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class TransactionDTO {\n");

    sb.append("    id: ").append(toIndentedString(id)).append("\n");
    sb.append("    description: ").append(toIndentedString(description)).append("\n");
    sb.append("    creditAccountId: ").append(toIndentedString(creditAccountId)).append("\n");
    sb.append("    debitAccountId: ").append(toIndentedString(debitAccountId)).append("\n");
    sb.append("    amount: ").append(toIndentedString(amount)).append("\n");
    sb.append("    date: ").append(toIndentedString(date)).append("\n");
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

