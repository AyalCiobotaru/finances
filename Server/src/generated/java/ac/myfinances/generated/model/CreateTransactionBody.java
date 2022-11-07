package ac.myfinances.generated.model;

import java.util.Objects;
import javax.persistence.Entity;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonCreator;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import java.time.LocalDate;
import org.openapitools.jackson.nullable.JsonNullable;
import java.io.Serializable;
import javax.persistence.CascadeType;
import javax.persistence.Convert;
import javax.persistence.Column;
import javax.persistence.ElementCollection;
import javax.persistence.EntityListeners;
import javax.persistence.Id;
import javax.persistence.Index;
import javax.persistence.Inheritance;
import javax.persistence.InheritanceType;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.OneToMany;
import javax.persistence.ManyToMany;
import javax.persistence.MappedSuperclass;
import javax.persistence.Table;
import javax.validation.Valid;
import javax.validation.constraints.*;
import com.fasterxml.jackson.annotation.*;



/**
 * CreateTransactionBody
 */
@javax.annotation.Generated(value = "org.openapitools.codegen.languages.SpringCodegen", date = "2022-11-06T20:19:28.485692-05:00[America/New_York]")

public class CreateTransactionBody  implements Serializable {
  private static final long serialVersionUID = 1L;



  @JsonProperty("description")
  private String description;



  @JsonProperty("credit-account-name")
  private String creditAccountName;



  @JsonProperty("debit-account-name")
  private String debitAccountName;



  @JsonProperty("amount")
  private Float amount;



  @JsonProperty("date")
  @org.springframework.format.annotation.DateTimeFormat(iso = org.springframework.format.annotation.DateTimeFormat.ISO.DATE)
  private LocalDate date;

  public CreateTransactionBody description(String description) {
    this.description = description;
    return this;
  }

  /**
   * Get description
   * @return description
  */
  @ApiModelProperty(value = "")


  public String getDescription() {
    return description;
  }

  public void setDescription(String description) {
    this.description = description;
  }

  public CreateTransactionBody creditAccountName(String creditAccountName) {
    this.creditAccountName = creditAccountName;
    return this;
  }

  /**
   * Get creditAccountName
   * @return creditAccountName
  */
  @ApiModelProperty(value = "")


  public String getCreditAccountName() {
    return creditAccountName;
  }

  public void setCreditAccountName(String creditAccountName) {
    this.creditAccountName = creditAccountName;
  }

  public CreateTransactionBody debitAccountName(String debitAccountName) {
    this.debitAccountName = debitAccountName;
    return this;
  }

  /**
   * Get debitAccountName
   * @return debitAccountName
  */
  @ApiModelProperty(value = "")


  public String getDebitAccountName() {
    return debitAccountName;
  }

  public void setDebitAccountName(String debitAccountName) {
    this.debitAccountName = debitAccountName;
  }

  public CreateTransactionBody amount(Float amount) {
    this.amount = amount;
    return this;
  }

  /**
   * Get amount
   * @return amount
  */
  @ApiModelProperty(value = "")


  public Float getAmount() {
    return amount;
  }

  public void setAmount(Float amount) {
    this.amount = amount;
  }

  public CreateTransactionBody date(LocalDate date) {
    this.date = date;
    return this;
  }

  /**
   * Get date
   * @return date
  */
  @ApiModelProperty(value = "")

  @Valid

  public LocalDate getDate() {
    return date;
  }

  public void setDate(LocalDate date) {
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
    CreateTransactionBody createTransactionBody = (CreateTransactionBody) o;
    return Objects.equals(this.description, createTransactionBody.description) &&
        Objects.equals(this.creditAccountName, createTransactionBody.creditAccountName) &&
        Objects.equals(this.debitAccountName, createTransactionBody.debitAccountName) &&
        Objects.equals(this.amount, createTransactionBody.amount) &&
        Objects.equals(this.date, createTransactionBody.date);
  }

  @Override
  public int hashCode() {
    return Objects.hash(description, creditAccountName, debitAccountName, amount, date);
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class CreateTransactionBody {\n");
    
    sb.append("    description: ").append(toIndentedString(description)).append("\n");
    sb.append("    creditAccountName: ").append(toIndentedString(creditAccountName)).append("\n");
    sb.append("    debitAccountName: ").append(toIndentedString(debitAccountName)).append("\n");
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

